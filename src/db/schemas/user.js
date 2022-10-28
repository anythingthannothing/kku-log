const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
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

module.exports = model("User", UserSchema);
