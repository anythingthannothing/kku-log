const express = require("express");
const router = express.Router({ mergeParams: true });
const Post = require("../models/post");
const Comment = require("../models/comment");
const catchAsync = require("../utils/catchAsync");
const {
  validateComment,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware");

// [COMMENT]
// Leave a Comment
router.post(
  "/",
  isLoggedIn,
  validateComment,
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    const comment = new Comment(req.body.comment);
    comment.author = req.user._id;
    post.comments.push(comment);
    await comment.save();
    await post.save();
    req.flash("success", "댓글이 정상적으로 등록되었습니다 :)");
    res.redirect(`/posts/${id}`);
  })
);

router.delete(
  "/:commentId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(async (req, res, next) => {
    const { id, commentId } = req.params;
    await Post.findByIdAndUpdate(id, { $pull: { comments: commentId } });
    await Comment.findByIdAndDelete(commentId);
    req.flash("success", "댓글이 정상적으로 삭제되었습니다 :)");
    res.redirect(`/posts/${id}`);
  })
);

module.exports = router;
