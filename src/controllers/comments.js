const Post = require("../db/schemas/post");
const Comment = require("../db/schemas/comment");

module.exports.create = async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  const comment = new Comment(req.body);
  comment.author = req.session.user._id;
  post.comments.push(comment);
  await comment.save();
  await post.save();
  req.flash("success", "댓글이 정상적으로 등록되었습니다 :)");
  res.sendStatus(201);
};

module.exports.delete = async (req, res, next) => {
  const { id, commentId } = req.params;
  await Post.findByIdAndUpdate(id, { $pull: { comments: commentId } });
  await Comment.findByIdAndDelete(commentId);
  res.sendStatus(200);
};
