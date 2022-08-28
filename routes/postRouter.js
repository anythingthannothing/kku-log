const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const Comment = require("../models/comment");
const { postSchema, commentSchema } = require("../schemas");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/expressError");

const validatePost = (req, res, next) => {
  const { error } = postSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  }
  next();
};

const validateComment = (req, res, next) => {
  const { error } = commentSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  }
  next();
};

// Create a new post
router.get("/new", (req, res) => {
  res.render("posts/new");
});

router.post(
  "/",
  validatePost,
  catchAsync(async (req, res, next) => {
    const post = new Post(req.body.post);
    await post.save();
    res.redirect(`/posts/${post._id}`);
  })
);

// Read a post
router.get(
  "/:id",
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const post = await Post.findById(id).populate("comments");
    res.render("posts/show", { post });
  })
);

// Update post
router.get(
  "/:id/edit",
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const post = await Post.findById(id);
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
    res.redirect(`/posts/${id}`);
  })
);

// delete post
router.delete(
  "/:id",
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.redirect("/");
  })
);

// [COMMENT]
// Leave a Comment
router.post(
  "/:id/comments",
  validateComment,
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const comment = new Comment(req.body.comment);
    const post = await Post.findById(id);
    post.comments.push(comment);
    await comment.save();
    await post.save();
    res.redirect(`/posts/${id}`);
  })
);

router.delete(
  "/:id/comments/:commentId",
  catchAsync(async (req, res, next) => {
    const { id, commentId } = req.params;
    await Post.findByIdAndUpdate(id, { $pull: { comments: commentId } });
    await Comment.findByIdAndDelete(commentId);
    res.redirect(`/posts/${id}`);
  })
);

module.exports = router;
