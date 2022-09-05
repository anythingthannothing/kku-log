const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

const admin = require("../controllers/admin");

router
  .route("/")
  .get(isLoggedIn, isAdmin, catchAsync(admin.getAdmin))
  .post(isLoggedIn, isAdmin, catchAsync(admin.addSubcategory));

module.exports = router;
