const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const comments = require("../controllers/comments");
const {
  validateComment,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware");

// [COMMENT]
// Leave a Comment
router.post("/", isLoggedIn, validateComment, catchAsync(comments.create));

router.delete(
  "/:commentId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(comments.delete)
);

module.exports = router;
