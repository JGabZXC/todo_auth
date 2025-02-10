const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Category must belong to a user!'],
  },
  name: {
    type: String,
    required: [true, 'Name is required to create category!'],
    minLength: 3,
  },
  color: String,
  icon: String,
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
