// =================================================================
//                      STUDYSPHERE BACKEND SERVER
// =================================================================

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // We will configure this correctly
require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');

const projectRoutes = require('./routes/projectRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// --- 🚀 THE FIX IS HERE: CORS CONFIGURATION ---
// We explicitly tell the server to trust your frontend domain.
const allowedOrigins = [
  'https://studysphere--hub.vercel.app', // Your production frontend URL
  'http://localhost:5173' // Your local development frontend URL
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
};

// Use the specific CORS options for both Express and Socket.IO
app.use(cors(corsOptions));
app.use(express.json());

// --- CREATE HTTP SERVER & INITIALIZE SOCKET.IO WITH CORS ---
const server = http.createServer(app);

const io = new Server(server, {
  cors: corsOptions // Apply the same CORS options to Socket.IO
});

app.set('io', io);

io.on('connection', (socket) => {
  console.log('✅ A user connected via WebSocket:', socket.id);
  socket.on('disconnect', () => {
    console.log('❌ A user disconnected:', socket.id);
  });
});

// --- DATABASE CONNECTION ---
const dbUri = process.env.MONGO_URI;
if (!dbUri) {
  console.error('❌ FATAL ERROR: MONGO_URI is not defined.');
  process.exit(1);
}

mongoose.connect(dbUri)
  .then(() => console.log('✅ MongoDB Connected Successfully!'))
  .catch(err => console.error('❌ DATABASE CONNECTION ERROR:', err));

// --- API ROUTES ---
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the StudySphere Backend API!',
    status: 'Server is running smoothly with real-time support.',
  });
});

app.use('/api/projects', projectRoutes);
app.use('/api/notifications', notificationRoutes);

// --- EXPORT FOR VERCEL (and start server for local dev) ---
module.exports = server;

if (process.env.NODE_ENV !== 'production') {
    server.listen(PORT, () => {
        console.log(`🚀 Server is running for local development on http://localhost:${PORT}`);
    });
}