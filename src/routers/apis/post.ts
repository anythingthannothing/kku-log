import { Router } from 'express';
import {
  validatePost,
  validatePostEdit,
  isAdmin,
  asyncHandler,
} from '../middlewares';
// import { clearCache } from '../../middlewares/cleanCache';
import { createPost, getPost, updatePost } from '../../controllers';

const router = Router();

router.get('/:postId', asyncHandler(getPost));
router.use(isAdmin);
router.post('/', validatePost, asyncHandler(createPost));
router.put('/:id', validatePostEdit, asyncHandler(updatePost));
//
// router.delete('/:id', asyncHandler(deletePost));

export default router;
