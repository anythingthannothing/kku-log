import { Router } from 'express';
import { asyncHandler } from '../middlewares';
import { getImgUploadURL } from '../../controllers';

const router = Router();

router.get('/', asyncHandler(getImgUploadURL));

export default router;
