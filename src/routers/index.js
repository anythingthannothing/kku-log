import { Router } from 'express';
import apiRouter from './apis';
import viewRouter from './view';

const router = Router();

router.use('/', viewRouter);
router.use('/api', apiRouter);

export default router;
