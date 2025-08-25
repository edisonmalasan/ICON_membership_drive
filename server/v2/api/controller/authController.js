const { authenticate } = require('../../services/authService.js');

async function handleLogin(req, res) {
    if (!req.body) {
        return res.status(400).json({
            message: 'Request body is required.'
        });
    }
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({
            message: 'Email and password are required.'
        });
    }

    try {
        const authorizedMember = await authenticate(email, password);
        console.log(authorizedMember);

        res.status(200).json({
            message: 'Login successful',
            member: authorizedMember.member,
            token: authorizedMember.token
        });
    } catch (error) {
        console.log(error)
        res.status(401).json({
            message: error.message
        });
    }
}

async function handleAuthorize(req, res) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            message: 'Authorization token is required.'
        });
    }

    try {
        const memberData = await verifyToken(token);
        res.status(200).json({
            message: 'Authorization successful',
            authorized: true
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({
            message: error.message
        });
    }
}

module.exports = {
    handleLogin,
    handleAuthorize
}                                                           