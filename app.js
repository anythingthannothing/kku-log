require("dotenv").config();

// Server
const express = require("express");
const app = express();

const path = require("path");

// Template
const engine = require("ejs-mate");

// Model
const mongoose = require("mongoose");
const User = require("./models/user");
const Subcategory = require("./models/subcategory");
const mongoSanitize = require("express-mongo-sanitize");

const methodOverride = require("method-override");
const ExpressError = require("./utils/expressError");
const morgan = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const PORT = process.env.PORT || 3000;

// DB
if (process.env.npm_lifecycle_event === "dev") {
  dbUrl = process.env.LOCAL_URL;
} else dbUrl = process.env.DB_URL;

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("DB Connected!");
  })
  .catch((err) => {
    console.log(err);
  });

app.engine("ejs", engine);

// express app 세팅
app.set("views", "src/views");
app.set("view engine", "ejs");

// express app 내장 미들웨어 세팅

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// express app 외장 미들웨어 세팅
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);
app.use(methodOverride("_method"));
app.use(morgan("dev"));

const secret = process.env.SECRET;

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: dbUrl,
      touchAfter: 24 * 3600,
      ttl: 3 * 24 * 60 * 60,
      secret,
      dbName: "myOwnBlog",
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

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// Routes
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");

// Index
app.get("/", (req, res) => {
  res.redirect("/posts");
});

app.use("/admin", adminRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/posts/:id/comments", commentRoutes);

// [BLOG]
// Index blogs
app.get("/blogs/", (req, res) => {
  res.render("blog");
});

app.all("*", (req, res, next) => {
  next(new ExpressError("페이지를 찾을 수 없습니다 :(", 404));
});

app.use(async (err, req, res, next) => {
  const subcategories = await Subcategory.find({});
  const { status = 500, message = "알 수 없는 오류가 발생했어요 :(" } = err;
  res.status(status).render("error", { message, subcategories });
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}! 🚀`);
});
