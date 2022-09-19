const mongoose = require("mongoose");
const Comment = require("./comment");
const Subcategory = require("./subcategory");
const Schema = mongoose.Schema;

const thumbnailSchema = new Schema({
  url: String,
  filename: String,
});

thumbnailSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_240");
});

const postSchema = new Schema({
  subcategory: {
    type: String,
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
  postedAt: {
    type: Date,
    default: Date.now,
  },
  editedLast: {
    type: Date,
    default: Date.now,
  },
  thumbnail: thumbnailSchema,
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

postSchema.post("findOneAndDelete", async function () {
  await Comment.deleteMany({
    _id: {
      $in: this.comments,
    },
  });
});

module.exports = mongoose.model("Post", postSchema);
