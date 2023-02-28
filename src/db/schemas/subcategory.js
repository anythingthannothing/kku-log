"use strict";
exports.__esModule = true;
exports.Subcategory = void 0;
var mongoose_1 = require("mongoose");
var SubcategorySchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    postCount: {
        type: Number,
        "default": 0
    },
    categoryId: {
        type: String,
        required: true
    }
}, { collection: 'subcategories' });
var Subcategory = (0, mongoose_1.model)('subcategories', SubcategorySchema);
exports.Subcategory = Subcategory;
