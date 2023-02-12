import { Router } from 'express';
import {
  validateComment,
  isLoggedIn,
  isReviewAuthor,
  asyncHandler,
} from '../../middlewares';
import { createComment, deleteComment } from '../../controllers';

const router = Router({ mergeParams: true });

router.post('/', isLoggedIn, validateComment, asyncHandler(createComment));

router.delete(
  '/:commentId',
  isLoggedIn,
  isReviewAuthor,
  asyncHandler(deleteComment),
);

export default router;
