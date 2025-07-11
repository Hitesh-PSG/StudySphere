const Notification = require('../models/Notification');

// --- Controller to GET all unread notifications ---
const getUnreadNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ isRead: false }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching notifications." });
  }
};

// --- Controller to MARK ALL notifications as read ---
const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany({ isRead: false }, { $set: { isRead: true } });
    res.status(200).json({ message: "All notifications marked as read." });
  } catch (error) {
    res.status(500).json({ message: "Server error marking notifications." });
  }
};

// Export the functions to be used by the routes
module.exports = {
    getUnreadNotifications,
    markAllAsRead,
};