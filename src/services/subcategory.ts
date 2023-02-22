import { SubcategoryModel } from '../db/models/subcategory';
import { errorNames } from '../error-names';
import { AppError } from '../app-error';

export class SubcategoryService {
  static async createSubcategory(categoryId, subcategory) {
    return await SubcategoryModel.create(categoryId, subcategory);
  }

  static async getAllSubcategories() {
    return SubcategoryModel.findAll();
  }
}
