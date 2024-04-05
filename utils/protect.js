const jwt = require('jsonwebtoken')
require('dotenv').config();
const fs = require("fs");


// Read the public key
const publicKeyPath = process.env.PUBLIC_KEY_PATH;
const publicKey = fs.readFileSync(publicKeyPath, 'utf8');

const requireAuth = (req,res,next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authentication token required' });
    }

    jwt.verify(token, publicKey, { algorithms: ['RS256'] },  (err, decoded) => {
       
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });
}


module.exports = requireAuth