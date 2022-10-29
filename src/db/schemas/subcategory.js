const { Schema } = require("mongoose");
const Post = require("./post");

const SubcategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

SubcategorySchema.post("findOneAndDelete", async function (document) {
  await Post.deleteMany({
    _id: {
      $in: document.posts,
    },
  });
});

module.exports = SubcategorySchema;
