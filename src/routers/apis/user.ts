import { Router } from 'express';
import { asyncHandler } from '../middlewares';
import { userController } from '../../controllers';

const router = Router();

router.get('/login', asyncHandler(userController.getGithubLogin));
router.get('/login/finish', asyncHandler(userController.postLogin));
router.get('/logout', asyncHandler(userController.getLogout));

export default router;
