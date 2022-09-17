const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const users = require("../controllers/users");
const { logout, isLoggedIn } = require("../middleware");

// [User]
router.get("/login", users.getLogin);

// User Login
router.post("/login", users.postLogin);

// User Logout
router.get("/logout", logout, users.getLogout);

module.exports = router;
