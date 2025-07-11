const Project = require('../models/Project.js');
const Notification = require('../models/Notification.js');
const axios = require('axios');
const cheerio = require('cheerio');

// --- Controller to GET all projects ---
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error });
  }
};

// --- Controller to CREATE a new project ---
const createProject = async (req, res) => {
  const { title, shortDescription, fullDescription, techStack, demoLink, githubLink, userName } = req.body;

  try {
    // Thumbnail scraping logic
    let thumbnail = null;
    if (demoLink) {
      try {
        const response = await axios.get(demoLink, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' }
        });
        const html = response.data;
        const $ = cheerio.load(html);
        const imageUrl = $('meta[property="og:image"]').attr('content');
        if (imageUrl) thumbnail = imageUrl;
      } catch (fetchError) {
        console.error(`Could not fetch thumbnail from ${demoLink}:`, fetchError.message);
      }
    }

    // Create the project
    const newProject = new Project({
      title, shortDescription, fullDescription, techStack, demoLink, githubLink, userName, thumbnail,
    });
    const savedProject = await newProject.save();

    // Create the associated notification
    const notificationMessage = `${userName || 'Someone'} has uploaded a new project: "${savedProject.title}"`;
    const newNotification = new Notification({
        message: notificationMessage,
        projectId: savedProject._id,
        isRead: false
    });
    await newNotification.save();

    // Get the io instance and emit the real-time event
    const io = req.app.get('io');
    io.emit('new_notification', newNotification);

    res.status(201).json(savedProject);
    
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(400).json({ message: 'Error creating project', error });
  }
};

// Export the functions to be used by the routes
module.exports = {
    getAllProjects,
    createProject,
};