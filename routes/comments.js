const express = require("express");
const router = express.Router({ mergeParams: true });
const comments = require("../controllers/comments");

const catchAsync = require("../utils/catchAsync");
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
  catchAsync(comments.remove)
);

module.exports = router;
