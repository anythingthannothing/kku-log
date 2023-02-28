"use strict";
exports.__esModule = true;
var express_1 = require("express");
var middlewares_1 = require("../middlewares");
var controllers_1 = require("../../controllers");
var router = (0, express_1.Router)();
router.get('/', (0, middlewares_1.asyncHandler)(controllers_1.getImgUploadURL));
exports["default"] = router;
