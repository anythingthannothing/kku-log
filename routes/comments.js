const express = require("express");
const router = express.Router({ mergeParams: true });
const Post = require("../models/post");
const Comment = require("../models/comment");
const { commentSchema } = require("../schemas");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/expressError");

const validateComment = (req, res, next) => {
  const { error } = commentSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((v) => v.message).join(",");
    throw new ExpressError(msg, 400);
  }
  next();
};

// [COMMENT]
// Leave a Comment
router.post(
  "/",
  validateComment,
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const comment = new Comment(req.body.comment);
    const post = await Post.findById(id);
    post.comments.push(comment);
    await comment.save();
    await post.save();
    req.flash("success", "댓글이 정상적으로 등록되었습니다 :)");
    res.redirect(`/posts/${id}`);
  })
);

router.delete(
  "/:commentId",
  catchAsync(async (req, res, next) => {
    const { id, commentId } = req.params;
    await Post.findByIdAndUpdate(id, { $pull: { comments: commentId } });
    await Comment.findByIdAndDelete(commentId);
    req.flash("success", "댓글이 정상적으로 삭제되었습니다 :)");
    res.redirect(`/posts/${id}`);
  })
);

module.exports = router;
