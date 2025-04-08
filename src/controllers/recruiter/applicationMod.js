const User = require('../../models/User');
const {responsePayload}=require('../../utils/responseModel');
require("dotenv").config();
const Application = require('../../models/Application')

const postApplication=async (req,res,next)=>{
    const {job_description,location,job_type,stipend,userId}=req.body;
    try {
        if(!job_description || job_description==='' || !location || location==='' || !job_type || job_type==='' || !stipend ||stipend===''){
            return res.status(400).json(responsePayload(false,500,"Bad Request",null));
        }
        console.log(userId);
        const newApplication=await Application.create({user_id : userId,job_description,location,job_type,stipend});
        console.log(newApplication);
        return res.status(201).json(responsePayload(true,201,"New Internship Application Created",true));
        
    } catch (error) {

       console.error("Post Application Error:", error.message);
           if (!res.headersSent) {
               return res.status(500).json(responsePayload(false, 500, error.message, null));
           }   
    }
}


module.exports={
postApplication
};