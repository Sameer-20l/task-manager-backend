const jwt = require('jsonwebtoken');
require('dotenv').config();
const {responsePayload}=require('../utils/responseModel')

const authenticateJWT = async (req,res,next)=>{
    const token = req.header('Authorization')?.split(' ')[1];

    if(!token){
       return res.status(401).json(responsePayload(false,res.statusCode,"Access Denied. No token provided",null));
    }

    try {
       const decoded=jwt.verify(token,process.env.JWT_SECRET);
       req.user = decoded;
       req.body.userId = decoded.userId;
       next();
    } catch (error) {
    if (!res.headersSent) {
        console.error('Invalid token:', error.message);
        return res.status(400).json({ message: 'Invalid token.' });
    }  
    }
}

module.exports = authenticateJWT;
