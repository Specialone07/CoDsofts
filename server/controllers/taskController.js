const Task = require('../models/taskSchema');
const User = require('../models/userSchema');
const Project = require('../models/projectSchema');

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find()
      .populate('assignedTo', 'username')
      .populate('project', 'name');
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error getting all tasks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createTask = async (req, res, next) => {
  try {
    const { title, description, assignedTo, deadline, status, project } = req.body;

    // Check if the assigned user exists
    const user = await User.findById(assignedTo);
    if (!user) {
      return res.status(404).json({ error: 'Assigned user not found' });
    }

    // Check if the project exists
    const projectObj = await Project.findById(project);
    if (!projectObj) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const newTask = new Task({ title, description, assignedTo, deadline, status, project });
    await newTask.save();

    // Ensure user.tasks and projectObj.tasks are initialized as arrays
    user.tasks = user.tasks || [];
    projectObj.tasks = projectObj.tasks || [];

    // Update the assigned user's tasks and the project's tasks
    user.tasks.push(newTask);
    projectObj.tasks.push(newTask);

    await Promise.all([user.save(), projectObj.save()]);

    res.status(201).json({ task: newTask });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Error creating task' });
  }
};

const updateTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const { title, description, assignedTo, deadline, status, project } = req.body;

    const task = await Task.findByIdAndUpdate(
      taskId,
      { title, description, assignedTo, deadline, status, project },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ task });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Error updating task' });
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findByIdAndDelete(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Remove the task reference from the assigned user's tasks
    const user = await User.findById(task.assignedTo);
    if (user) {
      user.tasks.pull(task);
      await user.save();
    }

    // Remove the task reference from the project's tasks
    const projectObj = await Project.findById(task.project);
    if (projectObj) {
      projectObj.tasks.pull(task);
      await projectObj.save();
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Error deleting task' });
  }
};

module.exports = { getAllTasks, createTask, updateTask, deleteTask };
