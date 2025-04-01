const express=require('express');
const {registerUser,getUserList,login}=require('../controllers/authController');
const authenticateJWT=require('../middlewares/authMiddleware')

const router = express.Router();

router.post("/register",registerUser);
router.get("/getUserList",authenticateJWT,getUserList);
router.post("/login",login);

module.exports=router;