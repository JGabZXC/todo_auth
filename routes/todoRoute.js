const express = require('express');
const authController = require('../controllers/authController');
const todoController = require('../controllers/todoController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, todoController.getUserTodo)
  .post(authController.protect, todoController.createTodo);

module.exports = router;
