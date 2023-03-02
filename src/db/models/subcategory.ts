import { Subcategory } from '../schemas/subcategory';

class SubcategoryModel {
  constructor(private subcategory) {}

  create = async (categoryId, subcategory) => {
    return await this.subcategory.create({
      title: subcategory,
      categoryId: categoryId,
    });
  };

  findAll = async () => {
    // const categories = await Subcategory.find().cache({ key: 'allCategories' });
    return await this.subcategory.find();
  };

  findByName = async (filter) => {
    return await this.subcategory.find(filter);
  };
}

const subcategoryModel = new SubcategoryModel(Subcategory);

export { subcategoryModel };
