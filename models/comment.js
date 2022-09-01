const mongoose = require("mongoose");
const user = require("./user");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  body: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
