// noinspection JSUnusedLocalSymbols

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Todo = require('../models/todoModel');
const Category = require('../models/categoryModel');

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|eq)\b/g,
      (match) => `$${match}`,
    );

    this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('createdAt');
    }

    return this;
  }

  paginate() {
    const page = +this.queryString.page || 1;
    const limit = +this.queryString.limit || 5;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

exports.getUserTodo = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Todo.find({ userID: req.user._id }),
    req.query,
  )
    .filter()
    .sort()
    .paginate();

  const todo = await features.query;

  res.status(200).json({
    status: 'success',
    length: todo.length,
    data: {
      todo,
    },
  });
});

exports.createTodo = catchAsync(async (req, res, next) => {
  const todo = await Todo.create({
    userID: req.user._id,
    category: req.body.category,
    title: req.body.title,
    description: req.body.description,
  });

  res.status(201).json({
    status: 'success',
    data: {
      todo,
    },
  });
});

exports.getTodo = catchAsync(async (req, res, next) => {
  const todo = await Todo.findOne({ _id: req.params.id, userID: req.user._id });

  if (!todo) return next(new AppError('No todo found with that ID', 404));

  await Todo.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      todo,
    },
  });
});

exports.deleteTodo = catchAsync(async (req, res, next) => {
  const todo = await Todo.findOne({ _id: req.params.id, userID: req.user._id });

  if (!todo) return next(new AppError('No todo found with that ID', 404));

  await Todo.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getUserCategory = catchAsync(async (req, res, next) => {
  const category = await Category.find({ userID: req.user._id });

  res.status(200).json({
    status: 'success',
    length: category.length,
    data: {
      category,
    },
  });
});

exports.deleteUserCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findOne({
    _id: req.params.id,
    userID: req.user._id,
  });

  if (!category)
    return next(new AppError('No category found with that ID', 404));

  await Category.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.createCategory = catchAsync(async (req, res, next) => {
  const category = await Category.create({
    userID: req.user._id,
    name: req.body.name,
    color: req.body.color,
    icon: req.body.icon,
  });

  res.status(201).json({
    status: 'success',
    data: {
      category,
    },
  });
});

exports.editStatus = catchAsync(async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) return next(new AppError('No todo found with that ID', 404));

  todo.status = req.body.status;
  await todo.save();

  res.status(200).json({
    status: 'success',
    data: {
      todo,
    },
  });
});
