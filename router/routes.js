/************************************************************
 * @description
 * 
 * @file        :   routes.js
 * @overview    :   To call the API.
 * @author      :   AnushKumar SK <anushk136@gmail.com>
 * @version     :   1.0
 * @since       :   05-03-2019
 * 
 * **********************************************************/
const express = require('express');
const author=require('./authorization')
const router = express.Router();
const notes = require('../controller/userController')
const note=require('../controller/chatController')
const loginMiddleWare=require('../middleware/authentication')
router.post('/Register', notes.registration)
router.post('/Login', notes.login)
router.use('/auth',author);
router.post('/Forgotpassword', notes.forgotpassword)
router.post('/Resetpassword/:token',loginMiddleWare.auth,notes.resetPassword)
// router.get('/getAllUser', notes.getAllUser)
// router.get('/getUserMsg',note.getUserMsg)

module.exports = router;



