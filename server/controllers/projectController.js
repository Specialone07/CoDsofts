const Project = require('../models/projectSchema');
const User = require('../models/userSchema');
const Task = require('../models/taskSchema');
const mongoose = require('mongoose');

const getAll = async (req, res, next) => {
  try {
    const projects = await Project.find().populate('createdBy', 'username');
    
    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: "No projects found" });
    }

    res.status(200).json({ projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createProject = async (req, res, next) => {
  try {
    const { name, description, deadline, createdBy } = req.body;

    // Check if createdBy is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(createdBy)) {
      return res.status(400).json({ error: 'Invalid createdBy ID' });
    }

    // Create a new project
    const newProject = new Project({
      name,
      description,
      deadline,
      createdBy,
    });

    // Save the project to the database
    const savedProject = await newProject.save();

    res.status(201).json(savedProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Error creating project' });
  }
};

const updateProject = async (req, res, next) => {
  try {
    const projectId = req.params.id;
    const { name, description, deadline, status } = req.body;

    console.log('Updating project status:', status);

    const project = await Project.findByIdAndUpdate(
      projectId,
      { name, description, deadline, status },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    console.log('Project updated:', project);

    res.status(200).json({ project });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Error updating project' });
  }
};

const getById = async (req, res) => {
  const projectId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ error: 'Invalid project ID' });
  }

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json({ project });
  } catch (error) {
    console.error('Error getting project by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const projectId = req.params.id;

    const project = await Project.findByIdAndDelete(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Remove the project reference from the createdBy user's projects
    const user = await User.findById(project.createdBy);
    if (user) {
      user.projects.pull(project);
      await user.save();
    }

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Error deleting project' });
  }
};

const getByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    // Fetch projects based on the userId
    const projects = await Project.find({ createdBy: userId }).populate('createdBy', 'username').populate('tasks');

    res.status(200).json({ projects });
  } catch (error) {
    console.error('Error getting projects by user ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getAll, createProject, updateProject, getByUserId, deleteProject, getById };
