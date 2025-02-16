const handler = require('./handlerController');
const User = require('../models/userModel');
const Todo = require('../models/todoModel');

exports.setID = (req, res, next) => {
  req.params.id = req.user._id;
  next();
};

exports.getAllUsers = handler.getAll(User);
exports.getUser = handler.getOne(User, (req) => ({ _id: req.params.id }));

exports.getAllMyTodo = handler.getAll(Todo, (req) => ({
  userID: req.user._id,
}));

exports.getMyTodo = handler.getOne(
  Todo,
  (req) => ({
    _id: req.params.id,
  }),
  'userID',
);

exports.updateMyTodo = handler.updateOne(Todo);

exports.deleteMyTodo = handler.deleteOne(Todo, (req) => ({
  _id: req.params.id,
}));

exports.createTodo = handler.createOne(Todo);
exports.setUserID = (req, res, next) => {
  req.params.id = req.user._id;
  next();
};
