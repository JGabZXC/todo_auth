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
  .post(userController.setUserId, userController.createTodo);
router
  .route('/me/todo/:id')
  .get(todoController.checkTodo, userController.getMyTodo);
router
  .route('/status/:id')
  .patch(todoController.checkTodo, todoController.editStatus);

router.use(authController.restrictTo('admin'));
router.route('/admin/').get(todoController.getAllTodos);
router.route('/admin/:id').get(todoController.getTodo);

module.exports = router;
