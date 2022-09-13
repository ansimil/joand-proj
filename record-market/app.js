// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const capitalized = require("./utils/capitalized");
const projectName = "record-market";

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;

//Session configuration :)

const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {maxAge: (1000 * 60 * 60 * 24)},
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
        })
    })
)
// end of session config

// passport config

const User = require('./models/User.model')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcryptjs = require('bcryptjs')

passport.serializeUser((user, done) => {
	done(null, user._id)
})

passport.deserializeUser((id, done) => {
	User.findById(id)
		.then(user => {
			done(null, user)
		})
		.catch(err => {
			done(err)
		})
})

passport.use((
	new LocalStrategy((username, password, done) => {
		// this logic will be executed when we log in
		User.findOne({ username: username })
			.then(user => {
				if (user === null) {
					// username is not correct
					done(null, false, { message: 'Wrong Credentials' })
				} else { 
                    if (bcryptjs.compareSync(password, user.password)) {
                        done(null, user)
                    }
                    else {
                        done(null,false, { message: 'Wrong Credetnials'})
                    }
				}
			})
	})
))

// google authorization

app.use(passport.initialize())
app.use(passport.session())



// end of passport config

// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index);


const artists = require("./routes/artists");
app.use("/", artists);

const albums = require("./routes/albums");
app.use("/", albums);

const auth = require("./routes/auth");
app.use("/", auth);

const collections = require("./routes/collections");
app.use("/collections", collections);


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
