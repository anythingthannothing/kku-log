import { Router } from 'express';
import { isAdmin } from '../middlewares';
import { asyncHandler } from '../middlewares';
import { AdminController } from '../controllers';

const router = Router();

router
  .route('/')
  .get(isAdmin, asyncHandler(AdminController.getAdmin))
  .post(isAdmin, asyncHandler(AdminController.addCategory));

router.delete(
  '/categories/:id',
  isAdmin,
  asyncHandler(AdminController.deleteCategory),
);
router.delete(
  '/subcategories/:id',
  isAdmin,
  asyncHandler(AdminController.deleteSubcategory),
);

export default router;
