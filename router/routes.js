const express = require('express');
const router = express.Router();
const notes = require('../controller/userController')

//const Middleware=require('../middleware/authentication')
console.log("adfdes");

router.post('/Register', notes.registration)
router.post('/Login', notes.login)
router.post('/Forgotpassword', notes.forgotpassword)
router.get('/getAllUser', notes.getAllUser)
module.exports = router



