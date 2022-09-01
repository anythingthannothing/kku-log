const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "이름은 필수 입력값입니다."],
  },
  email: {
    type: String,
    required: [true, "이메일은 필수 입력값입니다."],
    unique: true,
  },
  comments: [
    {
      type: [Schema.Types.ObjectId],
      ref: "Comment",
    },
  ],
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
