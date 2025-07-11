// BACKEND/models/Project.js

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title:            { type: String, required: true, trim: true },
  shortDescription: { type: String, required: true, trim: true },
  fullDescription:  { type: String, trim: true },
  techStack:        { type: [String], default: [] },
  demoLink:         { type: String, trim: true },
  githubLink:       { type: String, trim: true },
  
  // This field was already here and is correct. It will store the auto-generated URL.
  thumbnail:        { type: String, trim: true },
  
  // --- I HAVE ADDED THIS FIELD ---
  // Your frontend sends `userName`, so the backend needs to be able to save it.
  userName:         { type: String, required: true },

}, { timestamps: true });

module.exports = mongoose.models.Project || mongoose.model('Project', projectSchema);