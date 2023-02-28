"use strict";
exports.__esModule = true;
var express_1 = require("express");
var apis_1 = require("./apis");
var view_1 = require("./view");
var router = (0, express_1.Router)();
router.use('/', view_1["default"]);
router.use('/api', apis_1["default"]);
exports["default"] = router;
