import { CategoryModel, categoryModel } from '../db/models/category';

export class CategoryService {
  constructor(private categoryModel: CategoryModel) {}

  createCategory = async (categoryInfo) => {
    return await this.categoryModel.create(categoryInfo);
  };

  getCategories = async () => {
    return await this.categoryModel.findAll();
  };
}

export const categoryService = new CategoryService(categoryModel);
