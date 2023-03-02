import {
  categoryService,
  CategoryService,
  SubcategoryService,
  subcategoryService,
  PostService,
  postService,
} from '../services';

class ViewController {
  constructor(
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService,
    private postService: PostService,
  ) {}

  renderPosts = async (req, res, next) => {
    const categories = await this.categoryService.getCategories();
    const { filter } = req.query;
    const page = +req.query.page || 1;
    if (req.query.filter) {
      const postsInfo = await this.postService.getPostsBySubcategoryId(
        filter,
        page,
      );
      return res.render('index', {
        categories,
        nextPageUrl: `page=${postsInfo.nextPage}&filter=${filter}`,
        previousPageUrl: `page=${postsInfo.previousPage}&filter=${filter}`,
        ...postsInfo,
      });
    }
    const postsInfo = await this.postService.getPosts(page);
    return res.render('index', {
      categories,
      nextPageUrl: `page=${postsInfo.nextPage}`,
      previousPageUrl: `page=${postsInfo.previousPage}`,
      ...postsInfo,
    });
  };

  renderNewPost = async (req, res, next) => {
    const subcategories = await this.subcategoryService.getAllSubcategories();
    res.render('posts/new', { subcategories });
  };

  renderPost = async (req, res, next) => {
    const { id } = req.params;
    const categories = await this.categoryService.getCategories();
    const post = await this.postService.getPostById(id);
    if (!post) {
      req.flash('error', '포스트를 찾을 수 없습니다 :(');
      return res.redirect('/posts');
    }
    return res.render('posts/show', { categories, post });
  };

  renderEditPost = async (req, res, next) => {
    const { id } = req.params;
    const subcategories = await this.subcategoryService.getAllSubcategories();
    const post = await this.postService.getPostById(id);
    if (!post) {
      req.flash('error', '포스트를 찾을 수 없습니다 :(');
      return res.redirect('/posts');
    }
    res.render('posts/edit', { post, subcategories });
  };

  renderAdmin = async (req, res, next) => {
    const categories = await this.categoryService.getCategories();
    return res.render('admin/index', { categories });
  };
}

export const viewController = new ViewController(
  categoryService,
  subcategoryService,
  postService,
);
