const { model, Schema } = require("mongoose");
const SubcategorySchema = require("./subcategory");

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  subcategories: [SubcategorySchema],
});

CategorySchema.post("findOneAndDelete", async function (document) {
  await Subcategory.deleteMany({
    _id: {
      $in: document.subcategories,
    },
  });
});

module.exports = model("Category", CategorySchema);
