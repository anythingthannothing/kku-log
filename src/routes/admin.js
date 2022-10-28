const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middlewares");
const catchAsync = require("../utils/catchAsync");

const admin = require("../controllers/admin");

router
  .route("/")
  .get(isAdmin, catchAsync(admin.getAdmin))
  .post(isAdmin, catchAsync(admin.addCategory));

router.delete("/categories/:id", catchAsync(admin.deleteCategory));
router.delete("/subcategories/:id", catchAsync(admin.deleteSubcategory));

module.exports = router;
