const router = require("express").Router();
const passport = require('passport')

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index", {auth: req.isAuthenticated()});
});



module.exports = router;
