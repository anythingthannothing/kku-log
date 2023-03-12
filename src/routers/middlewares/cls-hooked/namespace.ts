import { createNamespace } from 'cls-hooked';
import mongoDb from '../../../mongoDb';

export const setSession = async (req, res, next) => {
  let session = createNamespace('session');
  session.run(async function () {
    let TransactionKey = await mongoDb.getSession();
    session.set('transactionKey', TransactionKey);
    next();
  });
};
