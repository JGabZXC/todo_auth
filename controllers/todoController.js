const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Todo = require('../models/todoModel');

exports.getUserTodo = catchAsync(async (req, res, next) => {
  const todo = await Todo.find({ userID: req.user._id});

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
