import { Router } from 'express';
import { asyncHandler } from '../middlewares';
import { CommentController } from '../controllers';

import { validateComment, isLoggedIn, isReviewAuthor } from '../middlewares';

const router = Router({ mergeParams: true });

router.post(
  '/',
  isLoggedIn,
  validateComment,
  asyncHandler(CommentController.create),
);

router.delete(
  '/:commentId',
  isLoggedIn,
  isReviewAuthor,
  asyncHandler(CommentController.delete),
);

export default router;
