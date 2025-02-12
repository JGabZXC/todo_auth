const express = require('express');
const authController = require('../controllers/authController');
const todoController = require('../controllers/todoController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(todoController.getUserTodo)
  .post(todoController.createTodo);

router
  .route('/:id')
  .patch(todoController.checkTodo, todoController.updateTodo)
  .get(todoController.checkTodo, todoController.getTodo)
  .delete(todoController.checkTodo, todoController.deleteTodo);

router
  .route('/status/:id')
  .patch(todoController.checkTodo, todoController.editStatus);

module.exports = router;
