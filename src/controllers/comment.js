import Post from '../db/schemas/post';
import Comment from '../db/schemas/comment';

export class CommentController {
  static async create(req, res, next) {
    const { id } = req.params;
    const post = await Post.findById(id);
    const comment = new Comment(req.body);
    comment.author = req.session.user._id;
    post.comments.push(comment);
    await comment.save();
    await post.save();
    req.flash('success', '댓글이 정상적으로 등록되었습니다 :)');
    res.sendStatus(201);
  }

  static async delete(req, res, next) {
    const { id, commentId } = req.params;
    await Post.findByIdAndUpdate(id, { $pull: { comments: commentId } });
    await Comment.findByIdAndDelete(commentId);
    res.sendStatus(200);
  }
}
