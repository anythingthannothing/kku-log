const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
const users = require("../controllers/users");
const { logout, isLoggedIn } = require("../middleware");

// [User]
// Get Sign Up
router.get("/register", users.getRegister);

// Register User
router.post("/register", catchAsync(users.postRegister));

router.get("/login", users.getLogin);

// User Login
router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/users/login",
    keepSessionInfo: true,
  }),
  users.postLogin
);

// User Logout
router.get("/logout", logout, users.getLogout);

module.exports = router;
