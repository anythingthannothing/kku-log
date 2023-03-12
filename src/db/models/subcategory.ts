import { Subcategory } from '../schemas/subcategory';
import { getNamespace } from 'cls-hooked';
import { AppError } from '../../app-error';
import { errorNames } from '../../error-names';

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

  increasePostCount = async (subcategoryId: string) => {
    const session = getNamespace('session').get('transactionKey');
    const subcategory = await this.subcategory.findById(subcategoryId);
    subcategory.postCount++;
    try {
      await subcategory.save({ session });
      await session.commitTransaction();
    } catch (err) {
      await session.abortTransaction();
      throw new AppError(errorNames.databaseError, 500, '트랜잭션 에러');
    } finally {
      await session.endSession();
    }
  };
}

const subcategoryModel = new SubcategoryModel(Subcategory);

export { subcategoryModel, SubcategoryModel };
