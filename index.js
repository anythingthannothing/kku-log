const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuid } = require("uuid");
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let posts = [
  {
    id: uuid(),
    title: "Post 1",
    content: "bla bla bal",
  },
  {
    id: uuid(),
    title: "Post 2",
    content: "da da da da",
  },
  {
    id: uuid(),
    title: "Post 3",
    content: "ba ba ba ba",
  },
];

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
