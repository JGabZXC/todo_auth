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

exports.getMyTodo = handler.getOne(Todo, (req) => ({ _id: req.params.id }));
exports.setCategoryIdParams = (req, res, next) => {
  req.params.id = req.params.categoryId;
  next();
};
exports.setUserId = (req, res, next) => {
  req.body.userID = req.user._id;
  next();
};
exports.createTodo = handler.createOne(Todo);
