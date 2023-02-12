import { Comment } from '../schemas/comment';

class CommentModel {
  static async create(commentInfo) {
    const newComment = await Comment.create(commentInfo);
    return newComment;
  }
}

export { CommentModel };
