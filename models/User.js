const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  comments: [
    {
      type: [Schema.Types.ObjectId],
      ref: "Comment",
      default: [],
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
