const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

const admin = require("../controllers/admin");

router
  .route("/")
  .get(isAdmin, catchAsync(admin.getAdmin))
  .post(isAdmin, catchAsync(admin.addCategory));

router.delete("/categories/:id", admin.deleteCategory);
router.delete("/subcategories/:id", admin.deleteSubcategory);

module.exports = router;
