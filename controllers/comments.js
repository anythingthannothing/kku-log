const Post = require("../models/Post");
const Comment = require("../models/Comment");

module.exports.create = async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  const comment = new Comment(req.body.comment);
  comment.author = req.user._id;
  post.comments.push(comment);
  await comment.save();
  await post.save();
  req.flash("success", "댓글이 정상적으로 등록되었습니다 :)");
  res.redirect(`/posts/${id}`);
};

module.exports.delete = async (req, res, next) => {
  const { id, commentId } = req.params;
  await Post.findByIdAndUpdate(id, { $pull: { comments: commentId } });
  await Comment.findByIdAndDelete(commentId);
  req.flash("success", "댓글이 정상적으로 삭제되었습니다 :)");
  res.redirect(`/posts/${id}`);
};
