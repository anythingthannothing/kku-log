const Subcategory = require("../models/subCategory");

module.exports.getAdmin = async (req, res) => {
  const subcategories = await Subcategory.find({});
  res.render("admin/index", { subcategories });
};

module.exports.addSubcategory = async (req, res) => {
  const sub = new Subcategory(req.body.sub);
  console.log(sub);
  await sub.save();
  return res.redirect("/admin");
};
