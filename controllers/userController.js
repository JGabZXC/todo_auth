const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: users,
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.json(200).json({
    status: 'success',
    length: users.length,
    data: {
      users,
    },
  });
});
