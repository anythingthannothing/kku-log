const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const { postSchema } = require("../schemas");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/expressError");
const isLoggedIn = require("../utils/isLoggedIn");

const validatePost = (req, res, next) => {
  const { error } = postSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  }
  next();
};

// [Post]
// Get Index
router.get(
  "/",
  catchAsync(async (req, res, next) => {
    const posts = await Post.find({});
    res.render(`index`, { posts });
  })
);

// Create a new post
router.get("/new", isLoggedIn, (req, res) => {
  res.render("posts/new");
});

router.post(
  "/",
  validatePost,
  catchAsync(async (req, res, next) => {
    const post = new Post(req.body.post);
    await post.save();
    req.flash("success", "포스트 등록 완료!");
    res.redirect(`/posts/${post._id}`);
  })
);

// Read a post
router.get(
  "/:id",
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const post = await Post.findById(id).populate("comments");
    if (!post) {
      req.flash("error", "포스트를 찾을 수 없습니다 :(");
      return res.redirect("/posts");
    }
    res.render("posts/show", { post });
  })
);

// Update post
router.get(
  "/:id/edit",
  isLoggedIn,
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      req.flash("error", "포스트를 찾을 수 없습니다 :(");
      return res.redirect("/posts");
    }
    res.render("posts/edit", { post });
  })
);

router.put(
  "/:id",
  validatePost,
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    let post = await Post.findByIdAndUpdate(id, req.body.post, {
      new: true,
      runValidators: true,
    });
    req.flash("success", "포스트 수정 완료!");
    res.redirect(`/posts/${id}`);
  })
);

// delete post
router.delete(
  "/:id",
  isLoggedIn,
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    req.flash("success", "포스트가 정상적으로 삭제되었습니다 :)");
    res.redirect("/posts");
  })
);

module.exports = router;
