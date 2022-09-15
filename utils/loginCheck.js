const router = require("express").Router();
const User = require('../models/User.model')
const bcrypt = require('bcryptjs')
const passport = require('passport')

function loginCheck() {
    return (req, res, next) => {
        if (req.isAuthenticated()) {
            next()
          } else {
            res.redirect('/login')
        }
    }
};

module.exports = loginCheck;
