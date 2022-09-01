const { postSchema, commentSchema } = require("./schemas");
const ExpressError = require("./utils/expressError");
const Comment = require("./models/comment");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "권한이 없습니다 :(");
    return res.redirect("/users/login");
  }
  next();
};

module.exports.isAdmin = (req, res, next) => {
  const { id } = req.params;
  if (!req.user || req.user.username !== "anythingthannothing") {
    req.flash("error", "권한이 없습니다 :(");
    return res.redirect(`/posts/${id}`);
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, commentId } = req.params;
  const comment = await Comment.findById(commentId);
  if (!comment.author.equals(req.user._id)) {
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

module.exports.validateComment = (req, res, next) => {
  const { error } = commentSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((v) => v.message).join(",");
    throw new ExpressError(msg, 400);
  }
  next();
};
