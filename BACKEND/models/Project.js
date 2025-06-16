const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title:            { type: String, required: true, trim: true },
  shortDescription: { type: String, required: true, trim: true },
  fullDescription:  { type: String, trim: true },
  techStack:        { type: [String], default: [] },
  demoLink:         { type: String, trim: true },
  githubLink:       { type: String, trim: true },
  thumbnail:        { type: String, trim: true },
}, { timestamps: true });

// If the model already exists, use it. If not, create it.
// This is important for serverless environments.
module.exports = mongoose.models.Project || mongoose.model('Project', projectSchema);