import { PostModel, postModel } from '../db/models/post';
import { AppError } from '../app-error';

export class PostService {
  constructor(private postModel: PostModel) {}

  createPost = async (postInfo) => {
    return await this.postModel.create(postInfo);
  };

  getPosts = async (page) => {
    const postCount = await this.postModel.countAll();
    const totalPage = Math.ceil(postCount / 5);
    if (page > totalPage) {
      throw new AppError('Bad Request', 400, 'Bad Request');
    }
    const posts = await this.postModel.findByPage(page);
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
  };

  getPostsBySubcategoryId = async (subcategoryId, page) => {
    const postCount = await this.postModel.countAll(subcategoryId);
    const totalPage = Math.ceil(postCount / 5);
    if (page > totalPage) {
      throw new AppError('Bad Request', 400, 'Bad Request');
    }
    const posts = await this.postModel.findByPage(page, subcategoryId);
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
  };

  getPostById = async (id) => {
    return await this.postModel.findById(id);
  };

  updatePost = async (postId, updateInfo) => {
    return await this.postModel.update(postId, updateInfo);
  };
}

const postService = new PostService(postModel);

export { postService };
