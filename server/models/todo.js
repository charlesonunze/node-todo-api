const mongoose = require('mongoose');

// create model
const TodoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = {
  Todo
};
