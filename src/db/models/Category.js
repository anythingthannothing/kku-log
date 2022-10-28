const mongoose = require("mongoose");
const { CategorySchema } = require("..");

module.exports = mongoose.model("Category", CategorySchema);
