"use strict";
exports.__esModule = true;
exports.Category = void 0;
var mongoose_1 = require("mongoose");
var CategorySchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    }
}, { collection: 'categories' });
var Category = (0, mongoose_1.model)('categories', CategorySchema);
exports.Category = Category;
