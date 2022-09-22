const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

const admin = require("../controllers/admin");

router
  .route("/")
  .get(isAdmin, catchAsync(admin.getAdmin))
  .post(isAdmin, catchAsync(admin.addCategory));

module.exports = router;
