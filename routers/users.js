const passport = require('passport')
const User = require('../models/user')
const express = require('express')
const router = express.Router()
const users = require('../controllers/user')

router.get('/register', users.reg ) //GET REGISTER//

router.post('/register', users.reqP) // POST REGISTER//

router.get('/login',users.log) // GET LOGIN//

router.post('/login',passport.authenticate('local',{failureFlash:true, failureRedirect:'/login'}),users.logP) // POST LOGIN//

router.get('/logout', users.logOut) //LOGOUT//

module.exports = router;