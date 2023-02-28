"use strict";
exports.__esModule = true;
exports.User = void 0;
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    comments: [
        {
            type: [mongoose_1.Schema.Types.ObjectId],
            ref: 'Comment',
            "default": []
        },
    ]
}, { collection: 'users', timestamps: true });
var User = (0, mongoose_1.model)('users', UserSchema);
exports.User = User;
