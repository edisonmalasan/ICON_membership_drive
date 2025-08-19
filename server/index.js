const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

const {connectToDatabase, disconnectFromDatabase} = require('./v2/utils/mongoUtil.js')

//import v2 api
const v2Routes = require('./v2/v2.js');

const app = express();
const PORT = process.env.PORT || 3000;

//Environment variable config
dotenv.config({path:'./.env'})

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from admin and student folders
app.use('/admin', express.static(path.join(__dirname, 'public', 'admin')));
app.use('/student', express.static(path.join(__dirname, 'public', 'student')));

// Routes to serve HTML files
app.get('/student', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'student', 'student.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin', 'admin.html'));
});

app.use('/api/v2', v2Routes);

try {
  connectToDatabase();
  // Start server
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Admin panel: http://localhost:${PORT}/admin`);
    console.log(`Student panel: http://localhost:${PORT}/student`);
  });
} catch (error) {
  disconnectFromDatabase();
  console.error('Error starting server:', error);
}
