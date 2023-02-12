import { CategoryModel } from '../db';
import { AppError } from '../middlewares';
import { errorNames } from '../utils/error-names';

export class CategoryService {
  static async createCategory(categoryInfo) {
    const newCategory = await CategoryModel.create(categoryInfo);
    return newCategory;
  }

  static async getCategories() {
    const categories = await CategoryModel.findAll();
    return categories;
  }

  static async deleteCategory(categoryId) {
    const category = await CategoryModel.findById(categoryId);
    const result = await CategoryModel.delete(categoryId);

    return result;
  }

  static async addSubcategory(categoryId, subcategoryName) {
    const result = await CategoryModel.addSubcategory(
      categoryId,
      subcategoryName,
    );
    if (!result) {
      throw new AppError(
        errorNames.databaseError,
        500,
        'DB에서 알 수 없는 에러가 발생했어요 :(',
      );
    }
    return;
  }
}
