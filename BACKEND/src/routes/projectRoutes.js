const express = require('express');
const router = express.Router();

// Import the controller functions
const { getAllProjects, createProject } = require('../controllers/projectController.js');

// Define the routes
router.get('/', getAllProjects);
router.post('/', createProject);

module.exports = router;