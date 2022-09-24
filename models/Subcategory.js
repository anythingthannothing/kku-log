const mongoose = require("mongoose");
const Post = require("../models/Post");
const Schema = mongoose.Schema;

const subcategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

subcategorySchema.post("findOneAndDelete", async function (document) {
  await Post.deleteMany({
    _id: {
      $in: document.posts,
    },
  });
});

module.exports = mongoose.model("Subcategory", subcategorySchema);
