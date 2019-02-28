const express = require('express');
const router = express.Router();
const notes = require('../controller/userController')
const loginMiddleWare=require('../middleware/authentication')
router.post('/Register', notes.registration)
router.post('/Login', notes.login)
router.post('/Forgotpassword', notes.forgotpassword)
router.post('/Resetpassword/:token',loginMiddleWare.checkToken,notes.resetPassword)
router.get('/getAllUser', notes.getAllUser)
module.exports = router



