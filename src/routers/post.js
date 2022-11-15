import { Router } from 'express';
import { asyncHandler } from '../middlewares';
import { validatePost, validatePostEdit, isAdmin } from '../middlewares';
import { PostController } from '../controllers';
import multer from 'multer';
import { storage } from '../config/cloudinary';

const router = Router();
const upload = multer({ storage });

router
  .route('/')
  .get(asyncHandler(PostController.index))
  .post(
    isAdmin,
    upload.single('thumbnail'),
    validatePost,
    asyncHandler(PostController.create),
  );

router.get('/new', isAdmin, PostController.new);

router
  .route('/:id')
  .get(asyncHandler(PostController.show))
  .all(isAdmin)
  .put(
    upload.single('thumbnail'),
    validatePostEdit,
    asyncHandler(PostController.update),
  )
  .delete(PostController.remove);

router.get('/:id/edit', isAdmin, asyncHandler(PostController.edit));

export default router;
