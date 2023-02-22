import { CategoryModel } from '../db/models/category';

export class CategoryService {
  static async createCategory(categoryInfo) {
    const newCategory = await CategoryModel.create(categoryInfo);
    return newCategory;
  }

  static async getCategories() {
    const categories = await CategoryModel.findAll();
    return categories;
  }

  // static async deleteCategory(categoryId) {
  //   const category = await CategoryModel.findById(categoryId);
  //   const result = await CategoryModel.delete(categoryId);
  //
  //   return result;
  // }
}
