// BACKEND/routes/projectRoutes.js

const express = require('express');
const router = express.Router();
const Project = require('../models/Project.js');

// --- NEW DEPENDENCIES FOR IMAGE EXTRACTION ---
const axios = require('axios');
const cheerio = require('cheerio');

// --- GET /api/projects - Fetches all projects (No changes needed here) ---
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 }); // Sort by newest
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

    // --- NEW LOGIC: AUTOMATICALLY EXTRACT THUMBNAIL ---
    // If a demoLink is provided, try to fetch the Open Graph image
    if (demoLink) {
      try {
        const response = await axios.get(demoLink, {
            // Some sites block requests without a user-agent
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' }
        });
        const html = response.data;
        const $ = cheerio.load(html);
        
        // Look for the 'og:image' meta tag, which is the standard for preview images
        const imageUrl = $('meta[property="og:image"]').attr('content');

        if (imageUrl) {
          thumbnail = imageUrl;
        }

      } catch (fetchError) {
        console.error(`Could not fetch thumbnail from ${demoLink}:`, fetchError.message);
        // If fetching fails, we just continue without a thumbnail. The project still gets saved.
      }
    }
    // --- END OF NEW LOGIC ---

    const newProject = new Project({
      title,
      shortDescription,
      fullDescription,
      techStack,
      demoLink,
      githubLink,
      userName,
      thumbnail, // The 'thumbnail' variable will be the URL we found, or null.
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
    
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(400).json({ message: 'Error creating project', error });
  }
});

module.exports = router;