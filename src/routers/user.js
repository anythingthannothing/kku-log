import { Router } from 'express';
import { asyncHandler } from '../middlewares';
import { UserController } from '../controllers';

const router = Router({ mergeParams: true });
// [User]
router.get('/login', asyncHandler(UserController.getLogin));

// User Login
router.get('/login/finish', asyncHandler(UserController.postLogin));

// User Logout
router.get('/logout', asyncHandler(UserController.getLogout));

export default router;
