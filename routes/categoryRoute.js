const express = require('express');
const authController = require('../controllers/authController');
const categoryController = require('../controllers/categoryController');
const todoRoute = require('./todoRoute');

const router = express.Router();

router.use(authController.protect);
router.use('/:categoryId/todos', categoryController.checkCategory, todoRoute);

router
  .route('/')
  .get(categoryController.checkCategory, categoryController.getUserCategory)
  .post(categoryController.checkCategory, categoryController.createCategory);

router
  .route('/:id')
  .patch(categoryController.checkCategory, categoryController.updateCategory)
  .delete(
    categoryController.checkCategory,
    categoryController.deleteUserCategory,
  );

module.exports = router;
