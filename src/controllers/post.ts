import { PostService, postService } from '../services';

class PostController {
  constructor(private postService: PostService) {}

  createPost = async (req, res, next) => {
    const postInfo = { ...req.body };
    const newPost = await this.postService.createPost(postInfo);
    req.flash('success', '포스트 등록 완료!');
    return res.status(201).json(newPost.id);
  };

  getPost = async (req, res, next) => {
    const { postId } = req.params;
    const post = await this.postService.getPostById(postId);
    return res.status(200).json(post);
  };

  updatePost = async (req, res, next) => {
    const { id } = req.params;
    const post = await this.postService.updatePost(id, { ...req.body });
    req.flash('success', '포스트 수정 완료!');
    res.sendStatus(200);
  };
}

const postController = new PostController(postService);

export { postController };
