import { PostModel } from '../db';
import { AppError } from '../middlewares';

export class PostService {
  static async createPost(postInfo) {
    return await PostModel.create(postInfo);
  }

  static async getPosts(page) {
    const postCount = await PostModel.countAll();
    const totalPage = Math.ceil(postCount / 5);
    if (page > totalPage) {
      throw new AppError('Bad Request', 400);
    }
    const posts = await PostModel.findByPage(page);
    const hasNextPage = totalPage > page;
    const nextPage = page + 1;
    return {
      totalPage,
      posts,
      hasNextPage,
      nextPage,
    };
  }

  static async getPostsBySubcategoryId(subcategoryId, page) {
    const postCount = await PostModel.countAll(subcategoryId);
    const totalPage = Math.ceil(postCount / 5);
    if (page > totalPage) {
      throw new AppError('Bad Request', 400);
    }
    const posts = await PostModel.findByPage(page, subcategoryId);
    const hasNextPage = totalPage > page;
    const nextPage = page + 1;
    return {
      totalPage,
      posts,
      hasNextPage,
      nextPage,
    };
  }

  static async getPostById(id) {
    return await PostModel.findById(id);
  }

  static async updatePost(postId, updateInfo) {
    const post = await PostModel.findById(postId);

    return await PostModel.update(postId, updateInfo);
  }
}
