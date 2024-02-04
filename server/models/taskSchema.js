const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  deadline: { type: Date },
  status: { type: String, enum: ['To Do', 'In Progress', 'Completed'], default: 'To Do' },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  created_at: { type: Date, default: Date.now },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
