const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
  },
  datePosted: {
    type: Date,
    default: Date.now,
  },
  dateEditedLast: {
    tpye: Date,
  },
  thumbnail: {
    type: String,
  },
});

module.exports = mongoose.model("Post", postSchema);
