const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/login').post(authController.login);
router.route('/signup').post(authController.signup);
router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword/:token').patch(authController.resetPassword);

router.use(authController.protect);

router.route('/me').get(userController.setID, userController.getUser);

router
  .route('/')
  .get(authController.restrictTo('admin'), userController.getAllUsers);

router
  .route('/:id')
  .get(authController.restrictTo('admin'), userController.getUser);

module.exports = router;
