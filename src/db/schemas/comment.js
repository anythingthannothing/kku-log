"use strict";
exports.__esModule = true;
exports.Comment = void 0;
var mongoose_1 = require("mongoose");
var CommentSchema = new mongoose_1.Schema({
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users'
    },
    body: {
        type: String,
        required: true
    }
}, { collection: 'comments', timestamps: true });
var Comment = (0, mongoose_1.model)('comments', CommentSchema);
exports.Comment = Comment;
