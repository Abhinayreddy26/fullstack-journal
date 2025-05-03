// app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Allow frontend to connect
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Optional: Default route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;
