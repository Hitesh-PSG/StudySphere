const express = require('express');
const router = express.Router();
const Project = require('../models/Project.js');
const axios = require('axios');
const cheerio = require('cheerio');
const Notification = require('../models/Notification.js');

// GET /api/projects - Fetches all projects (No changes here)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error });
  }
});

// POST /api/projects - Creates a new project
router.post('/', async (req, res) => {
  const { title, shortDescription, fullDescription, techStack, demoLink, githubLink, userName } = req.body;

  try {
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

    const newProject = new Project({
      title, shortDescription, fullDescription, techStack, demoLink, githubLink, userName, thumbnail,
    });
    const savedProject = await newProject.save();

    // Create and save the notification (Your existing code)
    const notificationMessage = `${userName || 'Someone'} has uploaded a new project: "${savedProject.title}"`;
    const newNotification = new Notification({
        message: notificationMessage,
        projectId: savedProject._id,
        isRead: false
    });
    await newNotification.save();

    // --- 🚀 ADD THIS BLOCK TO SEND THE REAL-TIME NOTIFICATION ---
    // Get the io instance we attached in server.js
    const io = req.app.get('io');
    // Emit an event named 'new_notification' to ALL connected clients.
    // Send the full notification object as the payload.
    io.emit('new_notification', newNotification);
    // --- END OF REAL-TIME BLOCK ---

    res.status(201).json(savedProject);
    
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(400).json({ message: 'Error creating project', error });
  }
});

module.exports = router;