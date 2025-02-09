const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: [true, 'User ID is required to create to do!'],
  },
  category: {
    type: String,
  },
  title: {
    type: String,
    required: [true, 'Title is required to create to do!'],
    minLength: 3,
    maxLength: 20,
  },
  description: {
    type: String,
    required: [true, 'Description is required to create to do!'],
    minLength: 3,
    maxLength: 100,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  completedAt: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'in-progress'],
    default: 'pending',
  },
});

todoSchema.pre('save', function (next) {
  if (this.status === 'completed') {
    this.status = 'completed';
  }

  next();
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
