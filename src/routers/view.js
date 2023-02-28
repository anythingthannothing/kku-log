"use strict";
exports.__esModule = true;
var express_1 = require("express");
var middlewares_1 = require("./middlewares");
var controllers_1 = require("../controllers");
var router = (0, express_1.Router)();
router.get('/', function (req, res, next) {
    return res.redirect('/posts');
});
router.get('/posts', (0, middlewares_1.asyncHandler)(controllers_1.viewController.renderPosts));
router.get('/posts/new', (0, middlewares_1.asyncHandler)(controllers_1.viewController.renderNewPost));
router.get('/posts/:id', (0, middlewares_1.asyncHandler)(controllers_1.viewController.renderPost));
router.get('/posts/:id/edit', (0, middlewares_1.asyncHandler)(controllers_1.viewController.renderEditPost));
router.get('/admin', controllers_1.viewController.renderAdmin);
exports["default"] = router;
