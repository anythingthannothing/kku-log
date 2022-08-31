const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");

// [User]
// Get Sign Up
router.get("/register", (req, res, next) => {
  res.render("users/register");
});

// Register User
router.post(
  "/register",
  catchAsync(async (req, res) => {
    try {
      const { name, email, username, password } = req.body.user;
      const user = new User({
        name,
        email,
        username,
      });
      await User.register(user, password);
      req.flash("success", "회원가입이 성공적으로 완료되었습니다 :)");
      res.redirect("/posts");
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/users/register");
    }
  })
);

router.get("/login", (req, res) => {
  res.render("users/login");
});

// User Login
router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/users/login",
  }),
  (req, res) => {
    req.flash("success", "로그인이 정상적으로 완료되었습니다 :)");
    res.redirect("/posts");
  }
);

// User Logout
router.post("/logout", (req, res) => {
  req.session.user_id = null;
  res.redirect("/posts");
});

module.exports = router;
