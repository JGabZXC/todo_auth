const express = require('express');
const authController = require('../controllers/authController');
const todoController = require('../controllers/todoController');
const userController = require('../controllers/userController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.route('/').get(userController.getAllMyTodo);

router
  .route('/me/todo')
  .get(userController.getAllMyTodo)
  .post(userController.createTodo);
router
  .route('/me/todo/:id')
  .get(todoController.checkTodo, userController.getMyTodo)
  .patch(todoController.checkTodo, userController.updateMyTodo)
  .delete(todoController.checkTodo, userController.deleteMyTodo);
router
  .route('/status/:id')
  .patch(todoController.checkTodo, todoController.editStatus);

// router.use(authController.restrictTo('admin'));
// 404 won't work if middleware for restrictTo is executed here, so it should be in the routes in order for the global error will work.
router
  .route('/admin')
  .get(authController.restrictTo('admin'), todoController.getAllTodos);
router
  .route('/admin/:id')
  .get(authController.restrictTo('admin'), todoController.getTodo);

module.exports = router;
