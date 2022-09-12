const router = require("express").Router();
const User = require('../models/User.model')
const bcrypt = require('bcryptjs')
const passport = require('passport')


router.get('/signup', (req, res, next) => {
     res.render('signup')
});




  
module.exports = router;