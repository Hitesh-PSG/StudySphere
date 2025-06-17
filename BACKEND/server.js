// In BACKEND/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// --- EXPLICIT CORS CONFIGURATION ---
// This tells your backend to only accept requests from your deployed frontend.
// This is more secure and reliable than a generic cors() setup.
const corsOptions = {
  origin: 'https://study-sphere-frontend-lovat.vercel.app',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));


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

// --- ROUTE REGISTRATION ---
// Tell Express to use your routes and prefix them correctly.
app.use('/api/projects', projectRoutes);
app.use('/api/notifications', notificationRoutes);


// This part is for local development only, Vercel ignores it.
app.listen(PORT, () => {
  console.log(`🚀 Server is running and listening on http://localhost:${PORT}`);
});

// Export the app for Vercel's serverless environment
module.exports = app;