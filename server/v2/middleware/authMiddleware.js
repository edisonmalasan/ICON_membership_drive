const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key';

const {verifyToken} = require('../utils/jwtUtil.js');

//TODO: roles should be nominal values ie. 1 should be admin 10 would be the lowest permission
function validateToken(...rolesAllowed) {
    return async(req, res, next) => {

        if (rolesAllowed.length <= 0){
            throw new Error("Middleware error: No roles allowed");
        }

        if (rolesAllowed.includes('superuser')){
            const handled = await checkSuperAdmin(req, res, next);
            if (handled) return next();
        }

        const token = req.headers['authorization']?.split(' ')[1];

        if(token){
            try {
                const decoded = verifyToken(token);
                if(!rolesAllowed.includes(decoded.role)){
                    res.status(403).json({ message: 'Access denied. You do not have the required role.' });
                }
                req.user = decoded;
                return next();
            } catch (error) {
                console.log(error)
                return res.status(400).json({ message: 'Invalid token.' });
            }
        }

        if(rolesAllowed.includes('guest')) {
            req.user = { name: 'guest', role: 'guest' };
            return next();
        }

        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
}



function checkSuperAdmin(req, res, next) {
    const {secret_key} = req.headers;
    console.log(secret_key)
   if (secret_key === SECRET_KEY) {
       req.user = {
           name: 'superuser',
           role: 'admin'
       };
       return true;
   }

   return false;
}

module.exports = { validateToken }