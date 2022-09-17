const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { validatePost, isLoggedIn, isAdmin } = require("../middleware");
const posts = require("../controllers/posts");
const multer = require("multer");
const { storage } = require("../cloudianry");
const upload = multer({ storage });

router
  .route("/")
  .get(catchAsync(posts.index))
  .post(upload.single("image"), catchAsync(posts.create));

router.get("/new", posts.new);

router
  .route("/:id")
  .get(catchAsync(posts.show))
  .put(
    isLoggedIn,
    isAdmin,
    upload.single("image"),
    validatePost,
    catchAsync(posts.update)
  )
  .delete(isLoggedIn, catchAsync(posts.remove));

router.get("/:id/edit", isAdmin, catchAsync(posts.edit));

module.exports = router;
