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

    const memberObj = member.toObject();
    delete memberObj.password;

    const token = generateToken(memberObj);
    return { member: memberObj, token };
}

module.exports = {
    authenticate
}