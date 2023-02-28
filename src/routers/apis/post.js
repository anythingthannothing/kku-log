"use strict";
exports.__esModule = true;
var express_1 = require("express");
var middlewares_1 = require("../middlewares");
// import { clearCache } from '../../middlewares/cleanCache';
var controllers_1 = require("../../controllers");
var router = (0, express_1.Router)();
router.get('/:postId', (0, middlewares_1.asyncHandler)(controllers_1.postController.getPost));
router.use(middlewares_1.isAdmin);
router.post('/', middlewares_1.validatePost, (0, middlewares_1.asyncHandler)(controllers_1.postController.createPost));
router.put('/:id', middlewares_1.validatePostEdit, (0, middlewares_1.asyncHandler)(controllers_1.postController.updatePost));
//
// router.delete('/:id', asyncHandler(deletePost));
exports["default"] = router;
