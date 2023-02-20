import { SubcategoryModel } from '../db';
import { AppError } from '../middlewares';
import { errorNames } from '../utils/error-names';

export class SubcategoryService {
  static async createSubcategory(categoryId, subcategory) {
    return await SubcategoryModel.create(categoryId, subcategory);
  }

  static async getAllSubcategories() {
    return SubcategoryModel.findAll();
  }
}
