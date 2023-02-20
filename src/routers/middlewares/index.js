export * from './error';

const {
  postSchema,
  postEditSchema,
  commentSchema,
} = require('./validations/joi-validation');
import { AppError } from './index';
const Comment = require('../../db/schemas/comment');

const setLocals = (req, res, next) => {
  res.locals.currentUser = req.session.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
};

const isLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    req.flash('error', '로그인을 해주세요 :)');
    return res.redirect('/posts');
  }
  next();
};

const logout = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash('error', '잘못된 접근입니다 :(');
    return res.redirect('/users/login');
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (
    !req.session.user ||
    req.session.user.email !== 'anythingthannothing@gmail.com'
  ) {
    req.flash('error', '권한이 없습니다 :(');
    return res.redirect(`/posts`);
  }
  next();
};

const isReviewAuthor = async (req, res, next) => {
  const { id, commentId } = req.params;
  const comment = await Comment.findById(commentId);
  if (!comment.author.equals(req.session.user._id)) {
    req.flash('error', '권한이 없습니다 :(');
    return res.redirect(`/posts/${id}`);
  }
  next();
};

const validatePost = (req, res, next) => {
  const { error } = postSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(',');
    throw new AppError(msg, 400);
  }
  next();
};

const validatePostEdit = (req, res, next) => {
  const { error } = postEditSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(',');
    throw new AppError(msg, 400);
  }
  next();
};

const validateComment = (req, res, next) => {
  const { error } = commentSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((v) => v.message).join(',');
    throw new AppError(msg, 400);
  }
  next();
};

export {
  setLocals,
  isLoggedIn,
  logout,
  isAdmin,
  isReviewAuthor,
  validatePost,
  validatePostEdit,
  validateComment,
};
