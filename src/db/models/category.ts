import { Category } from '../schemas/category';
import { ICategory } from '../types/category.interface';

export class CategoryModel implements ICategory {
  constructor(private category) {}

  create = async (categoryInfo) => {
    return await Category.create(categoryInfo);
  };

  findAll = async () => {
    return Category.aggregate([
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
  };
}

const categoryModel = new CategoryModel(Category);

export { categoryModel };
