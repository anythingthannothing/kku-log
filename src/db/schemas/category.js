const { model, Schema } = require("mongoose");
const Subcategory = require("./subcategory");

const CategorySchema = new Schema({
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

CategorySchema.post("findOneAndDelete", async function (document) {
  await Subcategory.deleteMany({
    _id: {
      $in: document.subcategories,
    },
  });
});

module.exports = model("Category", CategorySchema);
