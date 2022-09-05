const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  subCategory: [
    {
      type: Schema.Types.ObjectId,
      required: true,
    },
  ],
});

module.exports = mongoose.model("Category", categorySchema);
