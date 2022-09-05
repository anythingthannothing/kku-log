const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
const { logout, isLoggedIn } = require("../middleware");

// [User]
// Get Sign Up
router.get("/register", (req, res) => {
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
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, (error) => {
        if (error) return next(err);
        req.flash("success", "회원가입이 성공적으로 완료되었습니다 :)");
        res.redirect("/posts");
      });
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
    keepSessionInfo: true,
  }),
  (req, res) => {
    req.flash("success", "로그인이 정상적으로 완료되었습니다 :)");
    const redirectUrl = req.session.returnTo || "/posts";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
  }
);

// User Logout
router.get("/logout", logout, (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    const redirectUrl = req.session.returnTo;
    req.flash("success", "로그아웃이 완료되었습니다 :)");
    return res.redirect(redirectUrl);
  });
});

module.exports = router;
