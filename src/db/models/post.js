import { Post } from '../schemas/post';
import { Subcategory } from '../schemas/subcategory';

class PostModel {
  static async create(postInfo) {
    const newPost = await Post.create(postInfo);
    console.log(postInfo);
    const result = await Subcategory.updateOne(
      { _id: postInfo.subcategoryId },
      { $inc: { postCount: 1 } },
    );
    return newPost;
  }

  static async findAll() {
    const posts = await Post.find().limit(5).sort({ createdAt: -1 });
    return posts;
  }

  static async findOne(id) {
    const post = await Post.findById(id);
    // .cache({ key: id });
    return post;
  }

  static async update(postId, updateInfo) {
    const updatedPost = await Post.updateOne({ _id: postId }, updateInfo);
    return updatedPost;
  }
}

export { PostModel };
