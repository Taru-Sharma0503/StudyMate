const express=require('express');
const router=express.Router();
const {isLoggedIn}=require('../middlewares/auth.middleware');
const {getAnswer}=require('../services/ai.service');

router.use(isLoggedIn);

router.post('/ask-ai',getAnswer);

module.exports=router;