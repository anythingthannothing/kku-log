const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");

module.exports.getAdmin = async (req, res) => {
  const categories = await Category.find().populate("subcategories");
  const subcategories = await Subcategory.find();
  return res.render("admin/index", { categories, subcategories });
};

module.exports.addCategory = async (req, res) => {
  console.log(req.body);
  if (req.body.catname) {
    const cat = new Category({ name: req.body.catname });
    await cat.save();
  } else {
    const { cat, subname } = req.body;
    const sub = new Subcategory({ name: subname });
    const category = await Category.findOne({ name: cat });
    category.subcategories.push(sub);
    await category.save();
    await sub.save();
  }
  return res.redirect("/admin");
};

module.exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  await Category.findByIdAndDelete(id);
  return res.redirect("/admin");
};

module.exports.deleteSubcategory = async (req, res) => {
  const { id } = req.params;
  await Subcategory.findByIdAndDelete(id);
  return res.redirect("/admin");
};
