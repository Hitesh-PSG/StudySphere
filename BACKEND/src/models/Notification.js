const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  isRead:  {
    type: Boolean,
    default: false,
  },
}, { 
  timestamps: true
});

module.exports = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);