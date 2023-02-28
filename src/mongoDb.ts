import mongoose from 'mongoose';

const dbUrl = process.env.MONGODB_URL;
const isDev = process.env.NODE_ENV === 'development';

mongoose.set('strictQuery', false);
mongoose.set('debug', isDev);

class MongoDb {
  public readonly db: mongoose.Connection;

  constructor() {
    this.db = mongoose.createConnection(dbUrl);
  }

  public connect = () => {
    mongoose.connect(dbUrl);
    this.db.on('connected', () =>
      console.log(`⭕ MongoDB 서버 연결 완료! URL: ${dbUrl}`),
    );
    this.db.on('error', (error) =>
      console.error('❌ MongoDB 서버 연결 실패,,,'),
    );
  };

  public getSession = async () => {
    const session = await mongoose.createConnection(dbUrl).startSession();
    session.startTransaction();
    return session;
  };
}

const mongoDb = new MongoDb();

export default mongoDb;
