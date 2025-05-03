const express=require('express');
const authenticateJWT=require('../middlewares/authMiddleware');
const {cardData,tableData}=require('../controllers/admin/adminHome');

const router = express.Router();

router.get('/cardCount',authenticateJWT,cardData);
router.post('/tableData',tableData);

module.exports=router;