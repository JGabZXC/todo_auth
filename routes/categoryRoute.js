const express = require('express');
const authController = require('../controllers/authController');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(categoryController.getUserCategory)
  .post(categoryController.createCategory);

router
  .route('/:id')
  .patch(categoryController.checkCategory, categoryController.updateCategory)
  .delete(
    categoryController.checkCategory,
    categoryController.deleteUserCategory,
  );

module.exports = router;
