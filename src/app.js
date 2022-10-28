require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const mongoSanitize = require("express-mongo-sanitize");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const { setLocals } = require("./middlewares");

const Category = require("./db/schemas/category");

const morgan = require("morgan");

const flash = require("connect-flash");
const PORT = process.env.PORT || 3000;

// express app 세팅
app.set("views", "src/views");
app.set("view engine", "pug");

app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const dbUrl =
  process.env.NODE_ENV === "production"
    ? process.env.DB_URL
    : process.env.LOCAL_URL;

mongoose.connect(dbUrl);
const db = mongoose.connection;

db.on("connected", () =>
  console.log("⭕ MongoDB 서버에 정상적으로 연결되었습니다.")
);

db.on("error", (error) => console.log("❌ MongoDB 서버 연결에 실패했습니다."));

app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);

const secret = process.env.SECRET;
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: dbUrl,
      touchAfter: 24 * 3600,
      ttl: 3 * 24 * 60 * 60,
      secret,
      dbName: process.env.NODE_ENV ? "test" : "myOwnBlog",
    }),
    name: "session",
    secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 2,
      maxAge: 1000 * 60 * 60 * 24 * 2,
    },
  })
);

app.use(flash());
app.use(setLocals);

// Logger
app.use(morgan("dev"));
app.use((req, res, next) => {
  console.log(req.session.user?.name);
  next();
});

const globalRouter = require("./routes");

app.use("/", globalRouter);

// [BLOG]
// Index blogs
app.get("/blogs", (req, res) => {
  res.render("blog");
});

app.all("*", (req, res, next) => {
  next(new ExpressError("페이지를 찾을 수 없습니다 :(", 404));
});

app.use(async (err, req, res, next) => {
  const categories = await Category.find({}).populate("subcategories");
  const { status = 500, message = "알 수 없는 오류가 발생했어요 :(" } = err;
  res.status(status).render("error", { message, categories });
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
