const mongoose = require("mongoose");
const Subcategory = require("./Subcategory");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  subcategories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Subcategory",
    },
  ],
});

categorySchema.post("findOneAndDelete", async function (document) {
  await Subcategory.deleteMany({
    _id: {
      $in: document.subcategories,
    },
  });
});

module.exports = mongoose.model("Category", categorySchema);
