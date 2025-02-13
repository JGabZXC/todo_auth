// noinspection JSUnusedLocalSymbols,JSCheckFunctionSignatures,JSUnresolvedReference

const catchAsync = require('../utils/catchAsync');
const Todo = require('../models/todoModel');
const handler = require('./handlerController');

exports.checkTodo = handler.checkModel(Todo);

exports.getAllTodos = handler.getAll(Todo);

exports.getTodo = handler.getOne(Todo, (req) => ({
  _id: req.params.id,
  userID: req.user._id,
}));

exports.editStatus = catchAsync(async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);

  todo.status = req.body.status;
  await todo.save();

  res.status(200).json({
    status: 'success',
    data: {
      todo,
    },
  });
});
