const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");

module.exports.getAdmin = async (req, res) => {
  const categories = await Category.find().populate("subcategories");
  const subcategories = await Subcategory.find();
  return res.render("admin/index", { categories, subcategories });
};

module.exports.addCategory = async (req, res) => {
  if (req.body.subcategory) {
    const { category, subcategory } = req.body;
    const newSubcategory = new Subcategory({ name: subcategory });
    const superCategory = await Category.findOne({ name: category });
    superCategory.subcategories.push(newSubcategory);
    await superCategory.save();
    await newSubcategory.save();
  } else {
    const cat = new Category({ name: req.body.category });
    await cat.save();
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
