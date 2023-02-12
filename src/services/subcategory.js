import { SubcategoryModel } from '../db';
import { AppError } from '../middlewares';
import { errorNames } from '../utils/error-names';

export class SubcategoryService {
  static async createSubcategory(categoryId, subcategory) {
    const result = await SubcategoryModel.create(categoryId, subcategory);
    return result;
  }

  static async getAllSubcategories() {
    return SubcategoryModel.findAll();
  }
}
