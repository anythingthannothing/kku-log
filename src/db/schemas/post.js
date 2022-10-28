const { model, Schema } = require("mongoose");
const Comment = require("./comment");

const thumbnailSchema = new Schema({
  url: String,
  filename: String,
});

thumbnailSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_240");
});

const postSchema = new Schema(
  {
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
    thumbnail: thumbnailSchema,
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

postSchema.post("findOneAndDelete", async function (document) {
  await Comment.deleteMany({
    _id: {
      $in: document.comments,
    },
  });
});

module.exports = model("Post", postSchema);
