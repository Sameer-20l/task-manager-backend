const express=require('express');
const authenticateJWT=require('../middlewares/authMiddleware')
const {registerUser,getUserList,login}=require('../controllers/authController');

const router = express.Router();

router.post("/register",registerUser);
router.get("/getUserList",authenticateJWT,getUserList);
router.post("/login",login);

router.use('/recruiter',require('./recuiterRoutes'));


module.exports=router;