const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictToAdmin('admin'),
    userController.getAllUsers,
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictToAdmin('admin'),
    userController.getUser,
  );

router.route('/login').post(authController.login);

router.route('/signup').post(authController.signup);

router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword/:token').patch(authController.resetPassword);

module.exports = router;
