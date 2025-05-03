const express=require('express');
const authenticateJWT=require('../middlewares/authMiddleware')
const {registerUser,getUserList,login}=require('../controllers/authController');
const recuiterRoutes=require('./recuiterRoutes')
const applicantRoutes=require('./applicantRoutes');
const adminRoutes=require('./adminRoutes');

const router = express.Router();

router.post("/register",registerUser);
router.get("/getUserList",authenticateJWT,getUserList);
router.post("/login",login);

router.use('/recruiter',recuiterRoutes);
router.use('/applicant',applicantRoutes);
router.use('/admin',adminRoutes);


module.exports=router;