const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
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
    required: true,
  },
  datePosted: {
    type: Date,
    default: Date.now,
  },
  dateEditedLast: {
    tpye: Date,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
