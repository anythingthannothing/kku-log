"use strict";
exports.__esModule = true;
exports.Sequence = void 0;
var mongoose_1 = require("mongoose");
var SequenceSchema = new mongoose_1.Schema({
    collectionName: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        "default": 0
    }
}, { collection: 'sequences' });
var Sequence = (0, mongoose_1.model)('sequences', SequenceSchema);
exports.Sequence = Sequence;
