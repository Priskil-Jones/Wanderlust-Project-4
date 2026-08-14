const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../models/user.js");    //User Model
const wrapAsync = require("../utils/wrapAsync.js");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/user.js");


router.route("/signup")
.get(userController.renderSignupForm)               //SignUp
.post(wrapAsync(userController.signup));

router.route("/login")
.get(userController.renderLoginForm)               //Login
.post(saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/login", failureFlash: true }), userController.login);

router.get("/logout", userController.logout);      //Logout


module.exports = router;