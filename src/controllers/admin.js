import Category from '../db/schemas/category';
import Subcategory from '../db/schemas/subcategory';

export class AdminController {
  static async getAdmin(req, res, next) {
    const categories = await Category.find({});
    return res.render('admin/index', { categories });
  }

  static async addCategory(req, res, next) {
    if (req.body.subcategory) {
      const { category, subcategory } = req.body;
      await Category.findOneAndUpdate(
        { name: category },
        { $push: { subcategories: { name: subcategory } } },
      );
    } else {
      await Category.create({ name: req.body.category });
    }
    return res.sendStatus(201);
  }

  static async deleteCategory(req, res, next) {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    return res.sendStatus(200);
  }

  static async deleteSubcategory(req, res, next) {
    const { id } = req.params;
    await Subcategory.findByIdAndDelete(id);
    return res.sendStatus(200);
  }
}
