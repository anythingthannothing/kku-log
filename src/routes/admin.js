const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middlewares");
const catchAsync = require("../utils/catchAsync");

const admin = require("../controllers/admin");

router
  .route("/")
  .get(isAdmin, catchAsync(admin.getAdmin))
  .post(isAdmin, admin.addCategory);

router.delete("/categories/:id", isAdmin, catchAsync(admin.deleteCategory));
router.delete(
  "/subcategories/:id",
  isAdmin,
  catchAsync(admin.deleteSubcategory)
);

module.exports = router;
