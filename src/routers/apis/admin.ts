import { Router } from 'express';
import { asyncHandler, isAdmin } from '../middlewares';
import { adminController } from '../../controllers';

const router = Router();

router.use(isAdmin);
router.post('/categories', asyncHandler(adminController.createCategory));
router.post('/subcategories', asyncHandler(adminController.createSubcategory));

// router.delete('/categories/:id', asyncHandler(deleteCategory));
// router.delete(
//   '/categories/:categoryId/subcategory',
//   asyncHandler(deleteSubcategory),
// );

export default router;
