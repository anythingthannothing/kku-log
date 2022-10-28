const Category = require("../db/schemas/category");
const Subcategory = require("../db/schemas/subcategory");

module.exports.getAdmin = async (req, res) => {
  const categories = await Category.find().populate("subcategories");
  const subcategories = await Subcategory.find();
  return res.render("admin/index", { categories, subcategories });
};

module.exports.addCategory = async (req, res) => {
  if (req.body.subcategory) {
    const { category, subcategory } = req.body;
    const newSubcategory = await Subcategory.create({ name: subcategory });
    await Category.findOneAndUpdate(
      { name: category },
      { $push: { subcategories: newSubcategory } }
    );
  } else {
    await Category.create({ name: req.body.category });
  }
  return res.sendStatus(201);
};

module.exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  await Category.findByIdAndDelete(id);
  return res.sendStatus(200);
};

module.exports.deleteSubcategory = async (req, res) => {
  const { id } = req.params;
  await Subcategory.findByIdAndDelete(id);
  return res.sendStatus(200);
};
