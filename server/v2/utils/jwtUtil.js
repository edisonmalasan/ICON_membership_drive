const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'default';

function generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '4h' });
}

function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}

module.exports = {
    generateToken,
    verifyToken
};
