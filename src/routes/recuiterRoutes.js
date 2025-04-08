const express=require('express');
const authenticateJWT=require('../middlewares/authMiddleware');
const {postApplication}=require('../controllers/recruiter/applicationMod');


const router = express.Router();

router.post('/postApplication',authenticateJWT,postApplication);


module.exports=router;


