import { Router } from 'express';
import {
  validatePost,
  validatePostEdit,
  isAdmin,
  asyncHandler,
} from '../../middlewares';
// import { clearCache } from '../../middlewares/cleanCache';
import { createPost, updatePost, deletePost } from '../../controllers';

const router = Router();

router.use(isAdmin);
router.post('/', validatePost, asyncHandler(createPost));

router.put('/:id', validatePostEdit, asyncHandler(updatePost));

router.delete('/:id', asyncHandler(deletePost));

export default router;
