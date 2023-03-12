import { Sequence } from '../schemas/sequence';
import { getNamespace } from 'cls-hooked';
import { AppError } from '../../app-error';
import { errorNames } from '../../error-names';

export class SequenceModel {
  constructor(private sequence) {}

  increaseCollectionValue = async (collectionName: string) => {
    const session = getNamespace('session').get('transactionKey');
    const sequence = await this.findByCollectionName(collectionName);
    sequence.value++;
    try {
      await sequence.save({ session });
      return sequence.value;
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw new AppError(errorNames.databaseError, 500, '트랜잭션 에러');
    }
  };

  findByCollectionName = async (collectionName: string) => {
    return await this.sequence.findOne({ collectionName });
  };
}

export const sequenceModel = new SequenceModel(Sequence);
