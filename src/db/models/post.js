import { Post } from '../schemas/post';

class PostModel {
  static async create(postInfo) {
    const newPost = await Post.create(postInfo);
    return newPost;
  }

  static async findAll() {
    const posts = await Post.find().limit(5).sort({ createdAt: -1 });
    return posts;
  }

  static async findOne(id) {
    const post = await Post.findById(id).populate({
      path: 'comments',
      populate: {
        path: 'author',
      },
    });
    // .cache({ key: id });
    return post;
  }

  static async update(postId, updateInfo) {
    const updatedPost = await Post.updateOne({ _id: postId }, updateInfo);
    return updatedPost;
  }
}

export { PostModel };
