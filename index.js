const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const Post = require("./models/post");
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

// Index
app.get("/", async (req, res) => {
  const posts = await Post.find({});
  res.render("index", { posts });
});

// Create a new post
app.get("/posts/new", (req, res) => {
  res.render("new");
});

app.post("/posts", async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.redirect(`/posts/${post._id}`);
});

// Read a post
app.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  res.render("show", { post });
});

// Update post
app.get("/posts/:id/edit", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  res.render("edit", { post });
});

app.patch("/posts/:id", async (req, res) => {
  const { id } = req.params;
  let post = await Post.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  res.redirect(`/posts/${post._id}`);
});

// delete post
app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  await Post.findByIdAndDelete(id);
  res.redirect("/");
});

app.use((req, res) => {
  console.log("We got a new request!!!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}! 🚀`);
});
