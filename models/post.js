const mongoose = require("mongoose");
const Comment = require("./comment");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  category: {
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
    tpye: Date,
  },
  thumbnail: {
    url: String,
    filename: String,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

postSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Comment.deleteMany({
      _id: {
        $in: doc.comments,
      },
    });
  }
});

module.exports = mongoose.model("Post", postSchema);
