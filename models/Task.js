const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  deadline: Date,
  completed: Boolean,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const TaskModel = mongoose.model('tasks', TaskSchema);

module.exports = TaskModel;
//employee.
