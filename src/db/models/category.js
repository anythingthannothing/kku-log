import { Category } from '../schemas/category';

class CategoryModel {
  static async create(categoryInfo) {
    const newCategory = await Category.create(categoryInfo);
    return newCategory;
  }

  static async findAll() {
    const categories = await Category.aggregate([
      {
        $set: {
          id: {
            $toString: '$_id',
          },
        },
      },
      {
        $lookup: {
          from: 'subcategories',
          localField: 'id',
          foreignField: 'categoryId',
          as: 'subcategories',
        },
      },
    ]);
    console.log(categories);
    return categories;
  }

  static async findByName(filter) {
    const category = await Category.find(filter);
    return category;
  }
}

export { CategoryModel };
