const router = require("express").Router();
const User = require('../models/User.model')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const loginCheck = require('../utils/loginCheck')



router.get('/signup', (req, res, next) => {
     res.render('signup')
});


router.post("/signup", (req,res,next) => {
	const { username, password } = req.body
	
    if (username.length === 0) {
		res.render('signup', { message: 'Your username cannot be empty' })
		return
	}
	if (password.length < 6) {        
		res.render('signup', { message: 'Your password needs to be min 6 characters' })
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


router.get("/login", (req,res,next) => {        
    res.render("login")
});

router.post('/login', passport.authenticate('local', {
	successRedirect: '/profile',
	failureRedirect: '/login' ,    
}));



router.get("/profile", loginCheck(), (req,res,next) => {
    const loggedUser = req.user    
    res.render('profile', {user : loggedUser})
    console.log(loggedUser)
})

router.get('/logout', (req, res, next) => {
	//req.logout(err => next(err))  
    req.session.destroy()
    res.redirect('/')    
       
});


router.get('/test', loginCheck(), (req, res, next) => {
    res.render('test')
});


module.exports = router;