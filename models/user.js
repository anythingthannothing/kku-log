const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "이름은 필수 입력값입니다."],
  },
  id: {
    type: String,
    required: [true, "ID는 필수 입력값입니다."],
  },
  password: {
    type: String,
    required: [true, "비밀번호는 필수 입력값입니다."],
  },
});

userSchema.statics.findAndValidate = async function (id, password) {
  const user = await this.findOne({ id });
  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user : false;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model("User", userSchema);
