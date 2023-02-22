import { Subcategory } from '../schemas/subcategory';

class SubcategoryModel {
  static async create(categoryId, subcategory) {
    const newSubcategory = await Subcategory.create({
      title: subcategory,
      categoryId: categoryId,
    });
    return newSubcategory;
  }

  static async findAll() {
    // const categories = await Subcategory.find().cache({ key: 'allCategories' });
    const categories = await Subcategory.find();
    return categories;
  }

  static async findByName(filter) {
    const subcategory = await Subcategory.find(filter);
    return subcategory;
  }
}

export { SubcategoryModel };
