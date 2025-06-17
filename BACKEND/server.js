// =================================================================
//                      STUDYSPHERE BACKEND SERVER
// =================================================================

// --- 1. IMPORTS ---
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Loads variables from .env file into process.env

// Import your route files
const projectRoutes = require('./routes/projectRoutes');
const notificationRoutes = require('./routes/notificationRoutes');


// --- 2. INITIALIZATION & CONFIGURATION ---
const app = express();
const PORT = process.env.PORT || 5000;

// --- 3. CORS (Cross-Origin Resource Sharing) CONFIGURATION ---
// This is critical for security. It specifies which frontend domains are allowed to access this backend.
const allowedOrigins = [
  'https://study-sphere-frontend-lovat.vercel.app',
  // You can add your local development URL here if needed, e.g., 'http://localhost:5173'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests from the list of allowed origins, and also allow
    // requests that don't have an origin (like Postman or other server-to-server tools)
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('This origin is not allowed by CORS policy.'));
    }
  },
};

app.use(cors(corsOptions));


// --- 4. MIDDLEWARE ---
// Middleware to parse incoming JSON requests.
// This must come before your routes that handle JSON.
app.use(express.json());


// --- 5. DATABASE CONNECTION ---
const dbUri = process.env.MONGO_URI;
if (!dbUri) {
  console.error('❌ FATAL ERROR: MONGO_URI is not defined in the .env file.');
  process.exit(1); // Exit the application if the database URI is missing
}

mongoose.connect(dbUri)
  .then(() => console.log('✅ MongoDB Connected Successfully!'))
  .catch(err => console.error('❌ DATABASE CONNECTION ERROR:', err));


// --- 6. API ROUTES ---
// Health check route: A simple route to confirm the server is running.
// You can access this by going to your backend URL, e.g., https://study-sphere-backend-six.vercel.app/
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the StudySphere Backend API!',
    status: 'Server is running smoothly.',
  });
});

// Mount your application-specific routes under the '/api' namespace.
app.use('/api/projects', projectRoutes);
app.use('/api/notifications', notificationRoutes);


// --- 7. EXPORT FOR VERCEL ---
// This line is essential. Vercel uses this exported `app` object to handle incoming serverless requests.
// The `app.listen` method is not needed for Vercel's serverless environment, but it can be kept for local testing.
module.exports = app;

// Optional: You can keep this block for running the server locally.
// Vercel will ignore it.
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Server is running for local development on http://localhost:${PORT}`);
    });
}