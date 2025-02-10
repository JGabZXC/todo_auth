const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'To do must belong to a user!'],
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
