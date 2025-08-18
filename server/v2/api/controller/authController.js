const { authenticate } = require('../../services/authService.js');

async function handleLogin(req, res) {
    const {email, password} = req.body;

    try {
        const authorizedMember = await authenticate(email, password);

        res.status(200).json({
            message: 'Login successful',
            member: authorizedMember.member,
            token: authorizedMember.token
        });
    } catch (error) {
        res.status(401).json({
            message: error.message
        });
    }
}

module.exports = {
    handleLogin
}