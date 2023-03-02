import { subcategoryModel } from '../db/models/subcategory';

export class SubcategoryService {
  constructor(private subcategoryModel) {}

  createSubcategory = async (categoryId, subcategory) => {
    return await this.subcategoryModel.create(categoryId, subcategory);
  };

  getAllSubcategories = async () => {
    return this.subcategoryModel.findAll();
  };
}

const subcategoryService = new SubcategoryService(subcategoryModel);

export { subcategoryService };
