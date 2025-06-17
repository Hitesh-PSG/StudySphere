// In BACKEND/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
// Using a general cors() is perfectly fine and robust for this setup.
app.use(cors()); 
app.use(express.json());

// Import both of your route files
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

// --- ROUTE REGISTRATION (THE FIX) ---
// The "/api" prefix is now handled by the new vercel.json file in this folder.
// Express only needs to handle the part of the path AFTER /api.
app.use('/projects', projectRoutes);
app.use('/notifications', notificationRoutes);


// This part is for local development only, Vercel ignores it.
app.listen(PORT, () => {
  console.log(`🚀 Server is running and listening on http://localhost:${PORT}`);
});

// Export the app for Vercel's serverless environment
module.exports = app;