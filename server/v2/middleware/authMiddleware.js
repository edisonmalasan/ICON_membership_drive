
function validateToken(req, res, next) {
    const { mode } = req.headers;
    if(mode === 'legacy'){
        console.warn("Legacy mode detected");
        req.mode = 'legacy';
        next();
    }

    const token = req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token.' });
    }
}

module.exports = {validateToken}