const Member = require('../models/memberModel.js');
const mongoose = require('mongoose');

async function getMembers(filter = {}) {
    try {
        const members = await Member.find(filter).sort({ joinedAt: -1 }).select('-password -__v -joinedAt');
        return members;
    } catch (error) {
        console.error('Error fetching members:', error);
        throw new Error('Internal server error');
    }
}

async function addMember(id, name, year, course, email, password, role, emailRequired) {
    try {
        // Check if member already exists
        if(email){
            const existingMember = await Member.find({email});
            if (existingMember.length > 0) {
                return null;
            }
        }

        const newMember = new Member({id, name, year, course, email, password, role, emailRequired });
        await newMember.save();

        const member = newMember.toObject();
        delete member.password;
        delete member.__v;
        delete member.joinedAt;

        return member;
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

async function updateMember(id, memberData) {
    try{
        let updatedMember = await Member.findByIdAndUpdate(id, memberData, { new: true }).select('-password -__v -joinedAt');
        return updatedMember;
    } catch (error) {
        if(error instanceof mongoose.Error.CastError && error.kind === 'ObjectId'){
            let updatedMember = await Member.findOneAndUpdate({ id }, memberData, { new: true }).select('-password -__v -joinedAt');
            return updatedMember;
        }
        console.error('Error updating member:', error);
        throw new Error('Internal server error');
    }
}

module.exports = {
    getMembers,
    getMemberCount,
    exportMembersToCSV,
    addMember,
    updateMember
};
