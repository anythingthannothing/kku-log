const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const {
  validatePost,
  validatePostEdit,
  isLoggedIn,
  isAdmin,
} = require("../middleware");
const posts = require("../controllers/posts");
const multer = require("multer");
const { storage } = require("../cloudianry");
const upload = multer({ storage });

router
  .route("/")
  .get(catchAsync(posts.index))
  .post(
    isAdmin,
    upload.single("thumbnail"),
    validatePost,
    catchAsync(posts.create)
  );

router.get("/new", isAdmin, posts.new);

router
  .route("/:id")
  .get(catchAsync(posts.show))
  .all(isAdmin)
  .put(upload.single("thumbnail"), validatePostEdit, catchAsync(posts.update))
  .delete(catchAsync(posts.remove));

router.get("/:id/edit", isAdmin, catchAsync(posts.edit));

module.exports = router;
