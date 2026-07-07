import { Router } from 'express';
import { submitFeedback, getTeacherFeedback } from '../controllers/feedbackController';
import { verifyToken, requireRole } from '../middlewares/auth';

const router = Router();

router.use(verifyToken);

router.post('/', requireRole(['student']), submitFeedback);
router.get('/teacher', requireRole(['teacher', 'admin']), getTeacherFeedback);

export default router;
