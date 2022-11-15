import { Router } from 'express';
import adminRouter from './admin';
import commentRouter from './comment';
import postRouter from './post';
import userRouter from './user';

const router = Router();

router.get('/', (req, res) => {
  res.redirect('/posts');
});
router.use('/admin', adminRouter);
router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/posts/:id/comments', commentRouter);

export default router;
