const express = require('express');
const projectController = require('../controllers/projectController');

const { getAll, createProject, getById, updateProject, getByUserId, deleteProject } = projectController;
const projectRouter = express.Router();

projectRouter.get('/', getAll);
projectRouter.get('/:id', getById);
projectRouter.post('/add', createProject);
projectRouter.put('/update/:id', updateProject);

// Use a consistent route for fetching projects by user ID
projectRouter.get('/user/:id', getByUserId);

// Modify the delete route to match the client-side usage
projectRouter.delete('/:id', deleteProject);

module.exports = projectRouter;
