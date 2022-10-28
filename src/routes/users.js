const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const users = require("../controllers/users");
const { isLoggedIn } = require("../middlewares");

// [User]
router.get("/login", catchAsync(users.getLogin));

// User Login
router.get("/login/finish", catchAsync(users.postLogin));

// User Logout
router.get("/logout", users.getLogout);

module.exports = router;
