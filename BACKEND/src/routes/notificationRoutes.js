const express = require('express');
const router = express.Router();

// Import the controller functions
const { getUnreadNotifications, markAllAsRead } = require('../controllers/notificationController.js');

// Define the routes
router.get('/', getUnreadNotifications);
router.post('/mark-read', markAllAsRead);

module.exports = router;