// noinspection JSUnusedLocalSymbols,JSCheckFunctionSignatures

const catchAsync = require('../utils/catchAsync');
const Category = require('../models/categoryModel');
const AppError = require('../utils/appError');

exports.checkCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findOne({
    _id: req.params.id,
    userID: req.user.id,
  });

  if (!category)
    return next(new AppError('No category found with that ID', 404));

  next();
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

exports.updateCategory = catchAsync(async (req, res, next) => {
  if (req.body.userID)
    return next(new AppError(`You can't update userID`, 400));

  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      category,
    },
  });
});

exports.deleteUserCategory = catchAsync(async (req, res, next) => {
  await Category.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
