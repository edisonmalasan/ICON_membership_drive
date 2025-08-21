const { getMembers, getMemberCount, exportMembersToCSV, addMember } = require('../../services/memberService.js');

const { parseFilters } = require('../../utils/routeUtil.js');

async function handleGetMembers(req, res) {
    const allowedOperators = ['gte','lte','eq']
    let filters = {}
    if(req.query.filter){
        filters = parseFilters(req.query, allowedOperators);
        console.log('Filters applied:', filters);
    }
    try{
        const members = await getMembers(filters);
        res.status(200).json(members);
    }catch(error) {
        console.error('Error fetching members:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function handlePostMember(req,res){
    const { name, year, course, email, password, role } = req.body;

    if(password || role) {
        console.log('Setting password or role:', req.user);
        if(req.user.role !== 'admin'){
            return res.status(403).json({ error: 'Only admins can set password or role' });
        }
    }

    try {
        const newMember = await addMember(name, year, course, email, password, role);
        if (!newMember) {
            return res.status(409).json({ error: 'Email already exists' });
        }
        res.status(201).json(newMember);
    } catch (error) {
        console.error('Error adding member:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function handleGetCount(req,res) {
    try{
        const count = await getMemberCount();
        res.status(200).json({ count });
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