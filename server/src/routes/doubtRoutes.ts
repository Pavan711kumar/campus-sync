import { Router } from 'express';
import { createDoubtRequest, getBroadcastDoubts, acceptDoubtRequest } from '../controllers/doubtController';
import { verifyToken, requireRole } from '../middlewares/auth';

const router = Router();

// Apply auth middleware to all doubt routes
router.use(verifyToken);

// Students can create requests and accept requests
router.post('/', requireRole(['student']), createDoubtRequest);
router.get('/broadcast', requireRole(['student', 'teacher']), getBroadcastDoubts);
router.put('/:doubtId/accept', requireRole(['student']), acceptDoubtRequest);

export default router;
