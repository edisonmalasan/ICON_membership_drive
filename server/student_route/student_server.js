const express = require('express');
const router = express.Router();

// Add new member (Student)
router.post('/members', async (req, res) => {
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

// Get member count (for display on student page)
router.get('/count', async (req, res) => {
  try {
    const count = await Member.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;