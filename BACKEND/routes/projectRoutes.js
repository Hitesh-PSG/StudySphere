// BACKEND/routes/projectRoutes.js

const express = require('express');
const router = express.Router();
const Project = require('../models/Project.js');
const axios = require('axios');
const cheerio = require('cheerio');

// --- 1. MAKE SURE NOTIFICATION MODEL IS IMPORTED ---
const Notification = require('../models/Notification.js');

// --- GET /api/projects - Fetches all projects (No changes needed here) ---
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error });
  }
});

// --- POST /api/projects - Creates a new project ---
// THIS IS THE ROUTE WE ARE MODIFYING
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
        if (imageUrl) {
          thumbnail = imageUrl;
        }
      } catch (fetchError) {
        console.error(`Could not fetch thumbnail from ${demoLink}:`, fetchError.message);
      }
    }

    const newProject = new Project({
      title,
      shortDescription,
      fullDescription,
      techStack,
      demoLink,
      githubLink,
      userName,
      thumbnail,
    });

    const savedProject = await newProject.save();

    // --- 2. ADD THIS ENTIRE BLOCK TO CREATE THE NOTIFICATION ---
    // This is the missing feature you want back.
    if (savedProject) {
        const notificationMessage = `${userName || 'Someone'} has uploaded a new project: "${savedProject.title}"`;
        const newNotification = new Notification({
            message: notificationMessage,
            projectId: savedProject._id, // This links the notification to the project
            isRead: false // Ensure it starts as an unread notification
        });
        await newNotification.save(); // Save the notification to the database
    }
    // --- END OF NEW CODE BLOCK ---

    res.status(201).json(savedProject);
    
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(400).json({ message: 'Error creating project', error });
  }
});

module.exports = router;