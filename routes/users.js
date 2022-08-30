const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");
const { userSchema } = require("../schemas");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/expressError");

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  }
  next();
};

// [User]
// Get Sign Up
router.get("/register", (req, res, next) => {
  res.render("users/register");
});

router.get("/login", (req, res) => {
  res.render("users/login");
});

// Register User
router.post(
  "/register",
  validateUser,
  catchAsync(async (req, res, next) => {
    const { username, id, password } = req.body.user;
    const user = new User({
      username,
      id,
      password,
    });
    await user.save();
    req.session.user_id = user._id;
    res.redirect("/posts");
  })
);

// User Login
router.post(
  "/login",
  catchAsync(async (req, res, next) => {
    const { id, password } = req.body.user;
    const user = await User.findAndValidate(id, password);
    if (user) {
      req.session.user_id = user._id;
      res.redirect("/posts");
    } else {
      res.redirect("login");
    }
  })
);

router.post("/logout", (req, res) => {
  req.session.user_id = null;
  res.redirect("/posts");
});

module.exports = router;
