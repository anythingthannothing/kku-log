"use strict";
exports.__esModule = true;
exports.commentSchema = exports.postEditSchema = exports.postSchema = void 0;
var joi_1 = require("joi");
var postSchema = joi_1["default"].object({
    title: joi_1["default"].string().required(),
    content: joi_1["default"].string().required(),
    tags: joi_1["default"].string(),
    subcategoryId: joi_1["default"].string().required(),
    thumbnailUrl: joi_1["default"].string().uri().required()
});
exports.postSchema = postSchema;
var postEditSchema = joi_1["default"].object({
    title: joi_1["default"].string().required(),
    content: joi_1["default"].string().required(),
    subcategoryId: joi_1["default"].any(),
    tags: joi_1["default"].string().required(),
    thumbnailUrl: joi_1["default"].string().uri()
});
exports.postEditSchema = postEditSchema;
var commentSchema = joi_1["default"].object({
    body: joi_1["default"].string().required()
});
exports.commentSchema = commentSchema;
