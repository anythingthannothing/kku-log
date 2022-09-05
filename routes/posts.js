const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const catchAsync = require("../utils/catchAsync");
const { validatePost, isLoggedIn, isAdmin } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudianry");
const upload = multer({ storage });

router
  .route("/")
  .get(catchAsync(posts.index))
  .post(
    isLoggedIn,
    upload.single("image"),
    validatePost,
    catchAsync(posts.create)
  );

// Create a new post
router.get("/new", isLoggedIn, (req, res) => {
  res.render("posts/new");
});

router.post(
  "/",
  isLoggedIn,
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
    const post = await Post.findById(id).populate({
      path: "comments",
      populate: {
        path: "author",
      },
    });
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
  isAdmin,
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
  isAdmin,
  validatePost,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Post.findByIdAndUpdate(id, req.body.post, {
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
