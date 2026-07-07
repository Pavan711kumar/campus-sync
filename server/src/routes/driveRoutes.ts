import { Router } from 'express';
import { uploadFileRecord, getFilesBySubject, getAllSubjects } from '../controllers/driveController';
import { verifyToken, requireRole } from '../middlewares/auth';

const router = Router();

router.use(verifyToken);

router.get('/subjects', getAllSubjects);
router.get('/subject/:subject', getFilesBySubject);
router.post('/upload', requireRole(['student', 'teacher', 'admin']), uploadFileRecord);

export default router;
