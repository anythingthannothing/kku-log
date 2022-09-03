const express = require("express");
const router = express.Router();
const posts = require("../controllers/posts");
const catchAsync = require("../utils/catchAsync");
const { validatePost, isLoggedIn, isAdmin } = require("../middleware");

router
  .route("/")
  .get(catchAsync(posts.index))
  .post(isLoggedIn, validatePost, catchAsync(posts.create));

router.get("/new", isLoggedIn, posts.new);

router
  .route("/:id")
  .get(catchAsync(posts.show))
  .put(isAdmin, validatePost, catchAsync(posts.update))
  .delete(isLoggedIn, catchAsync(posts.remove));

router.get("/:id/edit", isAdmin, catchAsync(posts.edit));

module.exports = router;
