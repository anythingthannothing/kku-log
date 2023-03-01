import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import morgan from 'morgan';
import flash from 'connect-flash';

import {
  notFoundErrorHandler,
  errorHandler,
  appErrorHandler,
} from './routers/middlewares';
import globalRouter from './routers';
import { setLocals } from './routers/middlewares';

const app = express();

app.set('views', 'src/views');
app.set('view engine', 'pug');

app.use(express.static('src/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const dbUrl = process.env.MONGODB_URL as string;

const secret = process.env.SECRET as string;

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: dbUrl,
      touchAfter: 24 * 3600,
      ttl: 3 * 24 * 60 * 60,
      dbName: process.env.NODE_ENV === 'production' ? 'test' : 'myOwnBlog',
    }),
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 2,
    },
  }),
);
app.use(flash());
app.use(setLocals);

// Logger
app.use(morgan('dev'));
app.use((req, res, next) => {
  console.log(req.session.user?.name);
  next();
});

app.use('/', globalRouter);

app.use(notFoundErrorHandler);
app.use(errorHandler);
app.use(appErrorHandler);

export { app };
