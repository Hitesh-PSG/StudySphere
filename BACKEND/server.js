// =================================================================
//                      STUDYSPHERE BACKEND SERVER
// =================================================================

// --- 1. IMPORTS ---
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
require('dotenv').config();

const projectRoutes = require('./routes/projectRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

// --- 2. INITIALIZATION & CONFIGURATION ---
const app = express();
const PORT = process.env.PORT || 5000;

// --- 3. CORS (Cross-Origin Resource Sharing) CONFIGURATION ---
// THIS IS THE FINAL, SIMPLIFIED FIX.
// This tells the server to allow requests from any origin.
// While very specific rules are good, Vercel's firewall can sometimes
// interfere. This simple setup is the most robust way to get it working on Vercel.
app.use(cors());


// --- 4. MIDDLEWARE ---
// This must come after cors() and before your routes.
app.use(express.json());


// --- 5. DATABASE CONNECTION ---
const dbUri = process.env.MONGO_URI;
if (!dbUri) {
  console.error('❌ FATAL ERROR: MONGO_URI is not defined.');
  process.exit(1);
}

mongoose.connect(dbUri)
  .then(() => console.log('✅ MongoDB Connected Successfully!'))
  .catch(err => console.error('❌ DATABASE CONNECTION ERROR:', err));


// --- 6. API ROUTES ---
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the StudySphere Backend API!',
    status: 'Server is running smoothly.',
  });
});

app.use('/api/projects', projectRoutes);
app.use('/api/notifications', notificationRoutes);


// --- 7. EXPORT FOR VERCEL ---
module.exports = app;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Server is running for local development on http://localhost:${PORT}`);
    });
}