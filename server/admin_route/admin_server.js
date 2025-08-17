const express = require('express');
const router = express.Router();

// Get all members (Admin)
router.get('/members', async (req, res) => {
  try {
    const members = await Member.find().sort({ joinedAt: -1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get member count
router.get('/count', async (req, res) => {
  try {
    const count = await Member.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export members as CSV (Admin)
router.get('/export/csv', async (req, res) => {
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

module.exports = router;