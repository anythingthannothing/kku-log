const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");

module.exports.getAdmin = async (req, res) => {
  const categories = await Category.find({}).populate("subcategories");
  const subcategories = await Subcategory.find({});
  res.render("admin/index", { subcategories, categories });
};

module.exports.addCategory = async (req, res) => {
  if (req.body.cat) {
    const cat = new Category(req.body.cat);
    await cat.save();
  } else {
    const { cat, name } = req.body.sub;
    const sub = new Subcategory({ name });
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
