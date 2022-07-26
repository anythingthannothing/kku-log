const { postSchema, postEditSchema, commentSchema } = require("./schemas");
const ExpressError = require("./utils/expressError");
const Comment = require("./models/Comment");

module.exports.setLocals = (req, res, next) => {
  res.locals.currentUser = req.session.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
};

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    req.flash("error", "로그인을 해주세요 :)");
    return res.redirect("/posts");
  }
  next();
};

module.exports.logout = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "잘못된 접근입니다 :(");
    return res.redirect("/users/login");
  }
  next();
};

module.exports.isAdmin = (req, res, next) => {
  if (
    !req.session.user ||
    req.session.user.email !== "anythingthannothing@gmail.com"
  ) {
    req.flash("error", "권한이 없습니다 :(");
    return res.redirect(`/posts`);
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, commentId } = req.params;
  const comment = await Comment.findById(commentId);
  if (!comment.author.equals(req.session.user._id)) {
    req.flash("error", "권한이 없습니다 :(");
    return res.redirect(`/posts/${id}`);
  }
  next();
};

module.exports.validatePost = (req, res, next) => {
  const { error } = postSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  }
  next();
};

module.exports.validatePostEdit = (req, res, next) => {
  const { error } = postEditSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  }
  next();
};

module.exports.validateComment = (req, res, next) => {
  console.log(req.body);
  const { error } = commentSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((v) => v.message).join(",");
    throw new ExpressError(msg, 400);
  }
  next();
};
