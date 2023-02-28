require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
import mongoDb from './src/mongoDb';
import { app } from './src/app';

const PORT = process.env.PORT || 8000;

async function init() {
  mongoDb.connect();
  app.listen(PORT, () => {
    console.log(
      `💣 ${PORT}번 포트에서 서버를 시작합니다. http://localhost:${PORT}`,
    );
  });
}

init();
