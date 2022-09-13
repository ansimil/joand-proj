const router = require("express").Router();
const User = require('../models/User.model')
const bcrypt = require('bcryptjs')
const passport = require('passport')


router.get('/signup', (req, res, next) => {
     res.render('signup')
});


router.post("/signup", (req,res,next) => {
	const { username, password } = req.body
	
	if (password.length < 6) {
		res.render('signup', { message: 'Your password needs to be min 6 chars' })
		return
	}
	if (username.length === 0) {
		res.render('signup', { message: 'Your username cannot be empty' })
		return
	}

	User.findOne({ username: username })
		.then(userFromDB => {
			if (userFromDB !== null) {
				res.render('signup', { message: 'Username is alredy taken' })
			} else {
				const salt = bcrypt.genSaltSync()
				const hash = bcrypt.hashSync(password, salt)
				// create the user
				User.create({ username, password: hash })
					.then(createdUser => {
						console.log(createdUser)
						res.redirect('/login')
					})
					.catch(err => next(err))
			}
		})
});

  
module.exports = router;