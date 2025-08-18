const Member = require('../models/memberModel.js');
const { generateToken } = require('../utils/jwtUtil.js');

async function authenticate(email, password) {
    const member = await Member.findOne({ email });
    
    if(!member){
        throw new Error('Member not found');
    }

    //Password is not hashed for now
    if(member.password !== password) {
        throw new Error('Invalid password');
    }

    const token = generateToken(member);
    return { member: member.select('-password'), token };
}

module.exports = {
    authenticate
}