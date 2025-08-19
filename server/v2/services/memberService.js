const Member = require('../models/memberModel.js');

async function getMembers() {
    try {
        const members = await Member.find().sort({ joinedAt: -1 });
        return members;
    } catch (error) {
        console.error('Error fetching members:', error);
        throw new Error('Internal server error');
    }
}

async function addMember(name, year, course, email, password, role) {
    try {
        // Check if member already exists
        const existingMember = await Member.find({email});
        if (existingMember.length > 0) {
            return null;
        }

        const newMember = new Member({ name, year, course, email, password, role });
        await newMember.save();

        return newMember;
    } catch (error) {
        console.error('Error adding member:', error);
        throw new Error('Internal server error');
    }
}

async function getMemberCount() {
    try {
        const count = await Member.countDocuments();
        return count;
    } catch (error) {
        console.error('Error fetching member count:', error);
        throw new Error('Internal server error');
    }
}

async function exportMembersToCSV() {
    try {
        const members = await getMembers();
        
        // Create CSV content
        const csvHeaders = 'Name,Year,Course,Email,Joined At\n';
        const csvRows = members.map(member => 
        `"${member.name}","${member.year}","${member.course}","${member.email}","${member.joinedAt.toISOString()}"`
        ).join('\n');
    
        const csvContent = csvHeaders + csvRows;

        return csvContent;
    } catch (error) {
        console.error('Error exporting members to CSV:', error);
        throw new Error('Internal server error');
    }
}

module.exports = {
    getMembers,
    getMemberCount,
    exportMembersToCSV,
    addMember
};
