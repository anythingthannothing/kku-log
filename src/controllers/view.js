import { CategoryService, PostService, SubcategoryService } from '../services';
import { createClient } from 'redis';

const client = createClient();

const renderPosts = async (req, res, next) => {
  const categories = await CategoryService.getCategories();
  const { filter } = req.query;
  const page = +req.query.page || 1;
  if (req.query.filter) {
    const postsInfo = await PostService.getPostsBySubcategoryId(filter, page);
    return res.render('index', {
      categories,
      nextPageUrl: `page=${postsInfo.nextPage}&filter=${filter}`,
      previousPageUrl: `page=${postsInfo.previousPage}&filter=${filter}`,
      ...postsInfo,
    });
  }
  const postsInfo = await PostService.getPosts(page);
  return res.render('index', {
    categories,
    nextPageUrl: `page=${postsInfo.nextPage}`,
    previousPageUrl: `page=${postsInfo.previousPage}`,
    ...postsInfo,
  });
};

const renderNewPost = async (req, res, next) => {
  const subcategories = await SubcategoryService.getAllSubcategories();
  res.render('posts/new', { subcategories });
};

const renderPost = async (req, res, next) => {
  const { id } = req.params;
  const categories = await CategoryService.getCategories();
  const post = await PostService.getPostById(id);
  if (!post) {
    req.flash('error', '포스트를 찾을 수 없습니다 :(');
    return res.redirect('/posts');
  }
  return res.render('posts/show', { categories, post });
};

const renderEditPost = async (req, res, next) => {
  const { id } = req.params;
  const subcategories = await Subcategory.find({});
  const post = await PostService.findById(id);
  if (!post) {
    req.flash('error', '포스트를 찾을 수 없습니다 :(');
    return res.redirect('/posts');
  }
  res.render('posts/edit', { post, subcategories });
};

const renderAdmin = async (req, res, next) => {
  const categories = await CategoryService.getCategories();
  return res.render('admin/index', { categories });
};

export { renderPosts, renderNewPost, renderPost, renderEditPost, renderAdmin };
