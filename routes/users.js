const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const users = require("../controllers/users");
const { isLoggedIn } = require("../middleware");

// [User]
router.get("/login", isLoggedIn, users.getLogin);

// User Login
router.get("/login/finish", users.postLogin);

// User Logout
router.get("/logout", users.getLogout);

module.exports = router;
