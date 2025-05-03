const User = require('../../models/User');
const {responsePayload}=require('../../utils/responseModel');
require("dotenv").config();
const Application = require('../../models/Application');
const Applicant= require('../../models/Applicant');

const apply= async (req,res,next)=>{
    const {userId,application_id}=req.body;
try {
    if(!userId || userId === '' || !application_id || application_id===''){
        return res.status(400).json(responsePayload(false, 500,"Bad Request",null));
    }
    const newApply= Applicant.create({user_id : userId,application_id});
    console.log(newApply);
    return res.status(200).json(responsePayload(true,200,"Application sent to Recuiter",null));
} catch (error) {
    console.error("Post Application Error:", error.message);
           if (!res.headersSent) {
               return res.status(500).json(responsePayload(false, 500, error.message, null));
           } 
}
}

module.exports={
    apply
}