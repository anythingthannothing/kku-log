import { Router } from 'express';
import { asyncHandler } from '../middlewares';
import { getGithubLogin, postLogin, getLogout } from '../../controllers';

const router = Router();
// [User]
router.get('/login', asyncHandler(getGithubLogin));

// User Login
router.get('/login/finish', asyncHandler(postLogin));

// User Logout
router.get('/logout', asyncHandler(getLogout));

export default router;
