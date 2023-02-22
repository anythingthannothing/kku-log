import { Router } from 'express';
import { asyncHandler } from './middlewares';
import {
  renderPosts,
  renderNewPost,
  renderPost,
  // renderEditPost,
  renderAdmin,
} from '../controllers';

const router = Router();

router.get('/', (req, res, next) => {
  return res.redirect('/posts');
});

router.get('/posts', asyncHandler(renderPosts));
router.get('/posts/new', asyncHandler(renderNewPost));
router.get('/posts/:id', asyncHandler(renderPost));
// router.get('/posts/:id/edit', asyncHandler(renderEditPost));

router.get('/admin', renderAdmin);

export default router;
