import { Router } from 'express';
import {
  validatePost,
  validatePostEdit,
  isAdmin,
  asyncHandler,
} from '../middlewares';
// import { clearCache } from '../../middlewares/cleanCache';
import { postController } from '../../controllers';

const router = Router();

router.get('/:postId', asyncHandler(postController.getPost));
router.use(isAdmin);
router.post('/', validatePost, asyncHandler(postController.createPost));
router.put('/:id', validatePostEdit, asyncHandler(postController.updatePost));
//
// router.delete('/:id', asyncHandler(deletePost));

export default router;
