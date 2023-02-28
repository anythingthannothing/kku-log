"use strict";
exports.__esModule = true;
var express_1 = require("express");
var middlewares_1 = require("../middlewares");
var controllers_1 = require("../../controllers");
var router = (0, express_1.Router)();
// [User]
router.get('/login', (0, middlewares_1.asyncHandler)(controllers_1.getGithubLogin));
// User Login
router.get('/login/finish', (0, middlewares_1.asyncHandler)(controllers_1.postLogin));
// User Logout
router.get('/logout', (0, middlewares_1.asyncHandler)(controllers_1.getLogout));
exports["default"] = router;
