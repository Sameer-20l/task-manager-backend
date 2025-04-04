const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {responsePayload}=require('../utils/responseModel');
const { where } = require('sequelize');
require("dotenv").config();


const registerUser=async (req,res,next)=>{

    const {name,email,password,role}=req.body;

    if (!name || !email || !password) {
         res.status(400).json(responsePayload(false,res.statusCode,"All fields are required",null));
      }

    try {
        const existingUser=await User.findOne({where : {email}});
        console.log(existingUser);
        
        if(existingUser){
            res.status(400).json(responsePayload(false,res.statusCode,"User already exists",null));
        }
        
        const salt =await  bcrypt.genSalt(process.env.SALT);
        const hashedPassword =await  bcrypt.hash(password, salt);

        const newUser = await User.create({name,email,password: hashedPassword,role });
        console.log(newUser);

         return res.status(201).json(responsePayload(true,res.statusCode,"User Registered Successfully",{ id: newUser.id, name: newUser.name, email: newUser.email,role : newUser.role }))

    } catch (error) {
        console.error("Error:", error.message);
        if (!res.headersSent) {
            return res.status(500).json(responsePayload(false, 500, error.message, null));
        }
    }
}

const getUserList = async (req,res,next) =>{
    try {
        const userList = await User.findAll(
            {
                attributes : ['id','name','email']
            }
        );
        
        return res.status(200).json(responsePayload(true, res.statusCode, "User List Retrieved Successfully", userList));
    } catch (error) {
        console.error("Error:", error.message);
        if (!res.headersSent) {
            return res.status(500).json(responsePayload(false, 500, error.message, null));
        } 
    }
}

const login = async (req,res,next)=>{
const {email,password}=req.body;
if(!email || email==='' || !password || password===''){
    return res.status(400).json(responsePayload(false,res.statusCode,"Invaid Email",null));
}
try {
    const user= await User.findOne({where:{email}});

    if(!user){
        return res.status(400).json(responsePayload(false,res.statusCode,"Invaid Credentails",null));  
    }
    if(!user.is_active){
        return res.status(403).json(responsePayload(false.res.statusCode,"Unauthorized by Admin",null));
    }
    
    
    const isMatch= await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json(responsePayload(false,res.statusCode,"Invaid Credentails",null)); 
    }

    const token = jwt.sign({ userId: user.id,userRole : user.role }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

    return res.status(200).json(responsePayload(true,res.statusCode,"Login Succesfully!!",{access_token:token,role:user.role}));

} catch (error) {
    console.error("Error:", error.message);
    if (!res.headersSent) {
        return res.status(500).json(responsePayload(false, 500, error.message, null));
    }  
}
}


module.exports={
    registerUser,
    getUserList,
    login
}