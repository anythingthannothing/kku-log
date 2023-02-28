"use strict";
exports.__esModule = true;
exports.Post = void 0;
var mongoose_1 = require("mongoose");
var PostSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: true
    },
    subcategoryId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tags: {
        type: [String]
    },
    thumbnailUrl: {
        type: String,
        required: true
    }
}, { collection: 'posts', timestamps: true });
// PostSchema.post('findOneAndDelete', async function (document) {
//   await Comment.deleteMany({
//     _id: {
//       $in: document.comments,
//     },
//   });
// });
var Post = (0, mongoose_1.model)('posts', PostSchema);
exports.Post = Post;
