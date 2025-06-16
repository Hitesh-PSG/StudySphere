const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Notification = require('../models/Notification');
const axios = require('axios');
const cheerio = require('cheerio');

const getLinkPreview = async (url) => {
  try {
    const { data } = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const $ = cheerio.load(data);
    const imageUrl = $('meta[property="og:image"]').attr('content') || $('meta[property="twitter:image"]').attr('content');
    if (imageUrl) {
      return { imageUrl };
    }
    return null;
  } catch (error) {
    return null;
  }
};

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching projects." });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, shortDescription, demoLink, userName } = req.body;

    if (!title || !shortDescription || title.trim() === '' || shortDescription.trim() === '') {
      return res.status(400).json({ message: 'Title and Short Description are required.' });
    }

    const projectData = { ...req.body };

    if (demoLink && demoLink.trim() !== '') {
      const preview = await getLinkPreview(demoLink);
      if (preview && preview.imageUrl) {
        projectData.thumbnail = preview.imageUrl;
      }
    }
    
    const project = new Project(projectData);
    await project.save();

    const notificationMessage = `${userName || 'A user'} uploaded a new project: "${project.title}"`;
    const notification = new Notification({
      message: notificationMessage,
      projectId: project._id,
    });
    await notification.save();
    console.log(`✅ Notification created for project ID: ${project._id}`);

    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: `Failed to create project: ${error.message}` });
  }
});

module.exports = router;