const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subCategorySchema = new Schema({
  categoryId: {
    type: Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
  posts: {
    type: [Schema.Types.ObjectId],
  },
});

module.exports = mongoose.model("SubCategory", subCategorySchema);
