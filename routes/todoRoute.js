const express = require('express');
const authController = require('../controllers/authController');
const todoController = require('../controllers/todoController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/category')
  .get(todoController.getUserCategory)
  .post(todoController.createCategory);

router
  .route('/category/:id')
  .get(todoController.getUserCategory)
  .delete(todoController.deleteUserCategory);

router
  .route('/')
  .get(todoController.getUserTodo)
  .post(todoController.createTodo);

router
  .route('/:id')
  .get(todoController.getTodo)
  .delete(todoController.deleteTodo);

router.route('/status/:id').patch(todoController.editStatus);

module.exports = router;
