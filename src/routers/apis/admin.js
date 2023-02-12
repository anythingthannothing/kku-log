import { Router } from 'express';
import { asyncHandler, isAdmin } from '../../middlewares';
import {
  createCategory,
  createSubcategory,
  deleteCategory,
  deleteSubcategory,
} from '../../controllers';

const router = Router();

router.use(isAdmin);
router.post('/categories', asyncHandler(createCategory));
router.post('/subcategories', asyncHandler(createSubcategory));

router.delete('/categories/:id', asyncHandler(deleteCategory));
router.delete(
  '/categories/:categoryId/subcategory',
  asyncHandler(deleteSubcategory),
);

export default router;
