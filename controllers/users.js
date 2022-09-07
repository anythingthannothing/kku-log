const User = require("../models/user");
const Subcategory = require("../models/subcategory");

module.exports.getRegister = async (req, res) => {
  const subcategories = await Subcategory.find({});
  res.render("users/register", { subcategories });
};

module.exports.postRegister = async (req, res) => {
  try {
    const { name, email, username, password } = req.body.user;
    const user = new User({
      name,
      email,
      username,
    });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (error) => {
      if (error) return next(err);
      req.flash("success", "회원가입이 성공적으로 완료되었습니다 :)");
      res.redirect("/posts");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/users/register");
  }
};

module.exports.getLogin = async (req, res) => {
  const subcategories = await Subcategory.find({});
  res.render("users/login", { subcategories });
};

module.exports.postLogin = (req, res) => {
  req.flash("success", "로그인이 정상적으로 완료되었습니다 :)");
  const redirectUrl = req.session.returnTo || "/posts";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    const redirectUrl = req.session.returnTo;
    req.flash("success", "로그아웃이 완료되었습니다 :)");
    return res.redirect(redirectUrl);
  });
};
