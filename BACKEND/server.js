// In BACKEND/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Use a general CORS policy. This is robust and allows your frontend to connect.
app.use(cors()); 
app.use(express.json());

// Import your route files
const projectRoutes = require('./routes/projectRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

// Database Connection
const dbUri = process.env.MONGO_URI;
if (!dbUri) {
  console.error('❌ FATAL ERROR: MONGO_URI is not defined.');
  process.exit(1); 
}
mongoose.connect(dbUri)
  .then(() => console.log('✅ MongoDB Connected Successfully!'))
  .catch(err => console.error('❌ DATABASE CONNECTION ERROR:', err));

// --- THE FINAL FIX ---
// We explicitly tell Express to listen for the FULL path that the frontend is calling.
// No rewrites are needed. This is direct and foolproof.
app.use('/api/projects', projectRoutes);
app.use('/api/notifications', notificationRoutes);

// Export the app for Vercel
module.exports = app;