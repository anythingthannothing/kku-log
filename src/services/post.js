import { PostModel } from '../db';

export class PostService {
  static async createPost(postInfo) {
    const newPost = await PostModel.create(postInfo);
    return newPost;
  }

  static async getPosts() {
    const posts = await PostModel.findAll();
    return posts;
  }

  static async getPostById(id) {
    const post = await PostModel.findOne(id);
    return post;
  }

  static async updatePost(postId, updateInfo) {
    const post = await PostModel.findById(postId);

    const updatedPost = await PostModel.update(postId, updateInfo);
    return updatedCategory;
  }

  static async deletePost(postId) {
    const post = await PostModel.findById(postId);
    const productCount = await PostModel.countProducts(postId);
    const result = await PostModel.delete(postId);

    return result;
  }
}
