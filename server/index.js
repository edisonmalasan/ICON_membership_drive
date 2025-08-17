const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());


// Serve static files from admin and client folders
app.use('/admin', express.static(path.join(__dirname, '..', 'admin')));
app.use('/student', express.static(path.join(__dirname, '..', 'student')));

// Routes to serve HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'client.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'admin', 'admin.html'));
});


// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/membership_drive', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Member Schema
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

// Routes

// Get all members (Admin)
app.get('/api/members', async (req, res) => {
  try {
    const members = await Member.find().sort({ joinedAt: -1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new member (Client)
app.post('/api/members', async (req, res) => {
  try {
    const { name, year, course, email } = req.body;
    
    // Check if email already exists
    const existingMember = await Member.findOne({ email });
    if (existingMember) {
      return res.status(400).json({ error: 'Email already registered!' });
    }

    const member = new Member({ name, year, course, email });
    await member.save();
    
    res.status(201).json({
      message: 'Member registered successfully!',
      member: member
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Email already registered!' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

// Get member count
app.get('/api/count', async (req, res) => {
  try {
    const count = await Member.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export members as CSV (Admin)
app.get('/api/export/csv', async (req, res) => {
  try {
    const members = await Member.find().sort({ joinedAt: -1 });
    
    // Create CSV content
    const csvHeaders = 'Name,Year,Course,Email,Joined At\n';
    const csvRows = members.map(member => 
      `"${member.name}","${member.year}","${member.course}","${member.email}","${member.joinedAt.toISOString()}"`
    ).join('\n');
    
    const csvContent = csvHeaders + csvRows;
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=members.csv');
    res.send(csvContent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve static files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'client.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Admin panel: http://localhost:${PORT}/admin`);
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