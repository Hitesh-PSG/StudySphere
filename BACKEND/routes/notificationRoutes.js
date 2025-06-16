const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// GET /api/notifications - Fetches all unread notifications
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find({ isRead: false }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching notifications." });
  }
});

// POST /api/notifications/mark-read - Marks all as read
router.post('/mark-read', async (req, res) => {
  try {
    await Notification.updateMany({ isRead: false }, { $set: { isRead: true } });
    res.status(200).json({ message: "All notifications marked as read." });
  } catch (error) {
    res.status(500).json({ message: "Server error marking notifications." });
  }
});

module.exports = router;