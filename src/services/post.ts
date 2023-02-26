import { PostModel } from '../db/models/post';
import { AppError } from '../app-error';

export class PostService {
  static async createPost(postInfo) {
    return await PostModel.create(postInfo);
  }

  static async getPosts(page) {
    const postCount = await PostModel.countAll();
    const totalPage = Math.ceil(postCount / 5);
    if (page > totalPage) {
      throw new AppError('Bad Request', 400, 'Bad Request');
    }
    const posts = await PostModel.findByPage(page);
    const hasNextPage = totalPage > page;
    const nextPage = page + 1;
    const hasPreviousPage = page > 1;
    const previousPage = page - 1;
    return {
      totalPage,
      posts,
      hasNextPage,
      nextPage,
      hasPreviousPage,
      previousPage,
    };
  }

  static async getPostsBySubcategoryId(subcategoryId, page) {
    const postCount = await PostModel.countAll(subcategoryId);
    const totalPage = Math.ceil(postCount / 5);
    if (page > totalPage) {
      throw new AppError('Bad Request', 400, 'Bad Request');
    }
    const posts = await PostModel.findByPage(page, subcategoryId);
    const hasNextPage = totalPage > page;
    const nextPage = page + 1;
    const hasPreviousPage = page > 1;
    const previousPage = page - 1;
    return {
      totalPage,
      posts,
      hasNextPage,
      nextPage,
      hasPreviousPage,
      previousPage,
    };
  }

  static async getPostById(id) {
    return await PostModel.findById(id);
  }

  static async updatePost(postId, updateInfo) {
    return await PostModel.update(postId, updateInfo);
  }
}
