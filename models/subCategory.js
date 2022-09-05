const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subCategorySchema = new Schema({
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

module.exports = mongoose.model("SubCategory", subCategorySchema);
