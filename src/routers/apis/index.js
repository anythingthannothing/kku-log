import { Router } from 'express';
import adminRouter from './admin';
import commentRouter from './comment';
import postRouter from './post';
import userRouter from './user';
import uploadRouter from './upload';

const router = Router();

router.use('/', userRouter);
router.use('/admin', adminRouter);
router.use('/posts', postRouter);
router.use('/posts/:id/comments', commentRouter);
router.use('/upload', uploadRouter);

export default router;
