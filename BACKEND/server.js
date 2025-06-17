// =================================================================
//                      STUDYSPHERE BACKEND SERVER
// =================================================================

// --- 1. IMPORTS ---
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const projectRoutes = require('./routes/projectRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

// --- 2. INITIALIZATION & CONFIGURATION ---
const app = express();
const PORT = process.env.PORT || 5000;

// --- 3. CORS (Cross-Origin Resource Sharing) CONFIGURATION ---
// This is the only section that has been changed.
// Instead of a complex function, we pass the allowed origins directly.
// This is a more robust and standard way to configure CORS.
const corsOptions = {
  origin: [
    'https://study-sphere-frontend-lovat.vercel.app', // Your deployed frontend
    'http://localhost:5173',                         // Your local frontend for testing
    'http://127.0.0.1:5173'                          // Another local alias
  ]
};

app.use(cors(corsOptions));


// --- 4. MIDDLEWARE ---
app.use(express.json());


// --- 5. DATABASE CONNECTION ---
const dbUri = process.env.MONGO_URI;
if (!dbUri) {
  console.error('❌ FATAL ERROR: MONGO_URI is not defined in the .env file.');
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