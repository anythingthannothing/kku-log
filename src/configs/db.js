import mongoose from 'mongoose';

const dbUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.DB_URL
    : process.env.LOCAL_URL;

mongoose.connect(dbUrl);
const db = mongoose.connection;

db.on('connected', () =>
  console.log(`⭕ MongoDB 서버 연결 완료! URL: ${dbUrl}`),
);

db.on('error', (error) => console.error('❌ MongoDB 서버 연결 실패,,,'));
