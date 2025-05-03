const express=require('express');
const authenticateJWT=require('../middlewares/authMiddleware');
const {apply}=require('../controllers/applicant/applicantMod');


const router = express.Router();

router.post('/apply',authenticateJWT,apply)

module.exports=router;
