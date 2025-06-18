// =================================================================
//                      STUDYSPHERE BACKEND SERVER
// =================================================================

// --- 1. IMPORTS ---
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// --- ADD THESE NEW IMPORTS FOR REAL-TIME FUNCTIONALITY ---
const http = require('http');
const { Server } = require('socket.io');

const projectRoutes = require('./routes/projectRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

// --- 2. INITIALIZATION & CONFIGURATION ---
const app = express();
const PORT = process.env.PORT || 5000;

// --- 3. CORS (Cross-Origin Resource Sharing) CONFIGURATION ---
app.use(cors());

// --- 4. MIDDLEWARE ---
app.use(express.json());

// --- 5. CREATE HTTP SERVER & INITIALIZE SOCKET.IO ---
// We create an http server and wrap our express app with it.
const server = http.createServer(app);

// Initialize Socket.IO and attach it to the server.
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for simplicity, or lock down to your frontend URL
    methods: ["GET", "POST"]
  }
});

// Make the 'io' instance available to all routes by attaching it to the app object.
// This is how projectRoutes.js will be able to send notifications.
app.set('io', io);

// Log when a user connects (useful for debugging)
io.on('connection', (socket) => {
  console.log('✅ A user connected via WebSocket:', socket.id);
  socket.on('disconnect', () => {
    console.log('❌ A user disconnected:', socket.id);
  });
});

// --- 6. DATABASE CONNECTION ---
const dbUri = process.env.MONGO_URI;
if (!dbUri) {
  console.error('❌ FATAL ERROR: MONGO_URI is not defined.');
  process.exit(1);
}

mongoose.connect(dbUri)
  .then(() => console.log('✅ MongoDB Connected Successfully!'))
  .catch(err => console.error('❌ DATABASE CONNECTION ERROR:', err));

// --- 7. API ROUTES ---
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the StudySphere Backend API!',
    status: 'Server is running smoothly with real-time support.',
  });
});

app.use('/api/projects', projectRoutes);
app.use('/api/notifications', notificationRoutes);

// --- 8. EXPORT FOR VERCEL (and start server for local dev) ---
// Note we are exporting 'server', not 'app', but Vercel handles this.
module.exports = server;

if (process.env.NODE_ENV !== 'production') {
    // We listen on the 'server' instance, not the 'app' instance.
    server.listen(PORT, () => {
        console.log(`🚀 Server is running for local development on http://localhost:${PORT}`);
    });
}