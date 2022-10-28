const router = require("express").Router();
const adminRouter = require("./admin");
const commentRouter = require("./comments");
const postRouter = require("./posts");
const userRouter = require("./users");

router.get("/", (req, res) => {
  res.redirect("/posts");
});

router.use("/admin", adminRouter);
router.use("/users", userRouter);
router.use("/posts", postRouter);
router.use("/posts/:id/comments", commentRouter);

module.exports = router;
