// =================================================================
//                      STUDYSPHERE BACKEND SERVER
// =================================================================

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');

const projectRoutes = require('./routes/projectRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// --- ✅ THIS IS THE FIX ---
// The list of websites allowed to make requests to this backend.
const allowedOrigins = [
  'https://studysphere--hub.vercel.app', // Your production frontend URL
  'http://localhost:5173'              // Your local development URL
];

const corsOptions = {
  origin: function (origin, callback) {
    // The 'origin' is the URL of the site making the request.
    // We check if the incoming origin is on our guest list.
    // The '!origin' allows tools like Postman to also make requests.
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Block the request
    }
  }
};

// Use the specific CORS options for BOTH Express and Socket.IO
app.use(cors(corsOptions));
app.use(express.json());

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

const dbUri = process.env.MONGO_URI;
if (!dbUri) {
  console.error('❌ FATAL ERROR: MONGO_URI is not defined.');
  process.exit(1);
}

mongoose.connect(dbUri)
  .then(() => console.log('✅ MongoDB Connected Successfully!'))
  .catch(err => console.error('❌ DATABASE CONNECTION ERROR:', err));

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the StudySphere Backend API!',
    status: 'Server is running smoothly with real-time support.',
  });
});

app.use('/api/projects', projectRoutes);
app.use('/api/notifications', notificationRoutes);

module.exports = server;

if (process.env.NODE_ENV !== 'production') {
    server.listen(PORT, () => {
        console.log(`🚀 Server is running for local development on http://localhost:${PORT}`);
    });
}