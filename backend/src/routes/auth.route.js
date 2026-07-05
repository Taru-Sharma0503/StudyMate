const express = require('express');
const router = express.Router();
const authController=require('../controllers/auth.controller');

router.post('/login',authController.loginUser);
router.post('/register',authController.registerUser);
router.get('/logout',authController.logoutUser);
router.get('/refresh-token',authController.refreshToken);
router.post('/verify-email',authController.verifyEmail);
router.post('/verify-otp',authController.verifyOTP);
router.get('/profile',authController.profile);

module.exports=router;