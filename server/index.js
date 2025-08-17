const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Import route modules
const adminRoutes = require('./admin_route/admin_server.js');
const studentRoutes = require('./student_route/student_server.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from admin and student folders
app.use('/admin', express.static(path.join(__dirname, '..', 'admin')));
app.use('/student', express.static(path.join(__dirname, '..', 'student')));

// Routes to serve HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'student', 'client.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'admin', 'admin.html'));
});

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/membership_drive', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Member Schema (shared between routes)
const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: String,
    required: true,
    enum: ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate']
  },
  course: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  joinedAt: {
    type: Date,
    default: Date.now
  }
});

const Member = mongoose.model('member', memberSchema);

// Make Member model available globally for route files
global.Member = Member;

// API Routes
app.use('/api/admin', adminRoutes);
app.use('/api/student', studentRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Admin panel: http://localhost:${PORT}/admin`);
  console.log(`Student panel: http://localhost:${PORT}/`);
});

// Handle MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});