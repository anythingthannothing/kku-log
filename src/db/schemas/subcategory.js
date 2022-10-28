const { model, Schema } = require("mongoose");
const Post = require("./post");

const SubcategorySchema = new Schema({
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

SubcategorySchema.post("findOneAndDelete", async function (document) {
  await Post.deleteMany({
    _id: {
      $in: document.posts,
    },
  });
});

module.exports = model("Subcategory", SubcategorySchema);
