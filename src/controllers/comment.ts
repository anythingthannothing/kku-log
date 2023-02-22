// import { PostService } from '../services';
// import { CommentService } from '../services';
//
// const createComment = async (req, res, next) => {
//   const { id } = req.params;
//   const post = await PostService.findById(id);
//   const comment = new CommentService(req.body);
//   comment.author = req.session.user._id;
//   post.comments.push(comment);
//   await comment.save();
//   await post.save();
//   req.flash('success', '댓글이 정상적으로 등록되었습니다 :)');
//   res.sendStatus(201);
// };
//
// const deleteComment = async (req, res, next) => {
//   const { id, commentId } = req.params;
//   await PostService.findByIdAndUpdate(id, { $pull: { comments: commentId } });
//   await CommentService.findByIdAndDelete(commentId);
//   res.sendStatus(200);
// };
//
// export { createComment, deleteComment };
