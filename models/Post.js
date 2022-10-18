const mongoose = require("mongoose");
const Comment = require("./Comment");
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
  editedAt: {
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
  version: {
    type: Number,
    default: 0,
  },
});

postSchema.post("findOneAndDelete", async function (document) {
  await Comment.deleteMany({
    _id: {
      $in: document.comments,
    },
  });
});

module.exports = mongoose.model("Post", postSchema);
