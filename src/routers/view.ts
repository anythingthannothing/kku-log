import { Router } from 'express';
import { asyncHandler } from './middlewares';
import { viewController } from '../controllers';

const router = Router();

router.get('/', (req, res, next) => {
  return res.redirect('/posts');
});

router.get('/posts', asyncHandler(viewController.renderPosts));
router.get('/posts/new', asyncHandler(viewController.renderNewPost));
router.get('/posts/:id', asyncHandler(viewController.renderPost));
router.get('/posts/:id/edit', asyncHandler(viewController.renderEditPost));

router.get('/admin', viewController.renderAdmin);

export default router;
