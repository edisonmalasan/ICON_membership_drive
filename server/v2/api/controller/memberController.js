const { getMembers, getMemberCount, exportMembersToCSV, addMember } = require('../../services/memberService.js');


async function handleGetMembers(req, res) {
    try{
        const members = await getMembers();
        res.status(200).json(members);
    }catch(error) {
        console.error('Error fetching members:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function handlePostMember(req,res){
    const { name, year, course, email } = req.body;

    try {
        const newMember = await addMember(name, year, course, email);
        res.status(201).json(newMember);
    } catch (error) {
        console.error('Error adding member:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function handleGetCount(req,res) {
    try{
        const count = await getMemberCount();
    }catch(error) {
        console.error('Error fetching member count:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function handleExportCSV(req, res) {
    try{
        const csvContent = await exportMembersToCSV();
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="members.csv"');
        res.status(200).send(csvContent);
    }catch(error) {
        console.error('Error exporting members as CSV:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    handleGetCount,
    handleExportCSV,
    handleGetMembers,
    handlePostMember
}