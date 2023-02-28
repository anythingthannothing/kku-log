"use strict";
exports.__esModule = true;
var express_1 = require("express");
var middlewares_1 = require("../middlewares");
var controllers_1 = require("../../controllers");
var router = (0, express_1.Router)();
router.use(middlewares_1.isAdmin);
router.post('/categories', (0, middlewares_1.asyncHandler)(controllers_1.adminController.createCategory));
router.post('/subcategories', (0, middlewares_1.asyncHandler)(controllers_1.adminController.createSubcategory));
// router.delete('/categories/:id', asyncHandler(deleteCategory));
// router.delete(
//   '/categories/:categoryId/subcategory',
//   asyncHandler(deleteSubcategory),
// );
exports["default"] = router;
