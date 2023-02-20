import { SubcategoryModel } from '../db';
import { AppError } from '../routers/middlewares';
import { errorNames } from '../error-names';

export class SubcategoryService {
  static async createSubcategory(categoryId, subcategory) {
    return await SubcategoryModel.create(categoryId, subcategory);
  }

  static async getAllSubcategories() {
    return SubcategoryModel.findAll();
  }
}
