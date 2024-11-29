const express = require("express");
const router = express.Router();


//controllers
const Signup = require('../Auth/Signup')
const {Login , Logout} = require('../Auth/Login')
const Sellbook = require("../controllers/Sellbook")
const {fetchAll,fetchByGenre} = require('../controllers/fetchAllBooks')
const authenticateUser = require("../Auth/AuthUser")
const addToCart = require("../controllers/addToCart")
const Cart = require("../controllers/myCart")
const authenticateOTP = require("../Auth/AuthOTP")
const SendMail = require('../controllers/sendMail')
const uploadFile = require("../controllers/uploadFile")


//routes
router.post('/signup' , Signup)
router.post('/login' , Login)
router.post('/sellbook'  ,uploadFile.single('imgfile'), Sellbook)
router.get('/fetchall' , fetchAll);
router.get('/fetchbygenre' , fetchByGenre);
router.post('/addtocart' , authenticateUser,addToCart);
router.post('/logout' , Logout);
router.get('/myCart' ,authenticateUser, Cart);
router.post('/authOTP' , authenticateOTP);
router.post('/sendMail' , SendMail)


module.exports = router;

