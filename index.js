const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
const PORT = 3000;

// IP 주소 확인할 것
mongoose
  .connect("mongodb://122.32.193.199:27017/myOwnBlog")
  .then(() => {
    console.log("DB Connected!");
  })
  .catch((err) => {
    console.log("Error Detected");
  });

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const postSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  datePosted: {
    type: Date,
    default: Date.now,
  },
  dateEditedLast: {
    tpye: Date,
    default: null,
  },
});

// Index
app.get("/", (req, res) => {
  res.render("index", { posts });
});

// Create a new post
app.get("/post", (req, res) => {
  res.render("post");
});

app.post("/post", (req, res) => {
  const { title, content, tags } = req.body;
  posts.push({ id: uuid(), title, content, tags });
  res.redirect("/");
});

// Read a post
app.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  const post = posts.find((post) => post.id === id);
  res.render("show", { post });
});

// Update post
app.get("/posts/:id/edit", (req, res) => {
  const { id } = req.params;
  const post = posts.find((post) => post.id === id);
  res.render("edit", { post });
});

app.patch("/posts/:id", (req, res) => {
  const { title, content, tags } = req.body;
  const { id } = req.params;
  let post = posts.find((post) => post.id === id);
  post.title = title;
  post.content = content;
  post.tags = tags;
  res.redirect("/");
});

// delete post
app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  posts = posts.filter((post) => post.id !== id);
  res.redirect("/");
});

app.use((req, res) => {
  console.log("We got a new request!!!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}! 🚀`);
});
