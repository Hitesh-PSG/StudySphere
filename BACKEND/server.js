const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// --- THIS IS THE FIX (PART 1) ---
// We need to import BOTH sets of routes.
const projectRoutes = require('./routes/projectRoutes');
const notificationRoutes = require('./routes/notificationRoutes'); // This line was missing or not in your running version.

const dbUri = process.env.MONGO_URI;

if (!dbUri) {
  console.error('❌ FATAL ERROR: MONGO_URI is not defined in your BACKEND/.env file.');
  process.exit(1); 
}

mongoose.connect(dbUri)
  .then(() => console.log('✅ MongoDB Connected Successfully!'))
  .catch(err => console.error('❌ DATABASE CONNECTION ERROR:', err));

// Use the project routes for any request to /api/projects
app.use('/api/projects', projectRoutes);

// --- THIS IS THE FIX (PART 2) ---
// We tell our app to use the notification routes for any request to /api/notifications.
app.use('/api/notifications', notificationRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running and listening on http://localhost:${PORT}`);
});