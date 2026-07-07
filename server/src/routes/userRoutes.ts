import { Router } from 'express';
import { getProfile, updateProfile, getAllStudents } from '../controllers/userController';
import { verifyToken, requireRole } from '../middlewares/auth';

const router = Router();

// Apply auth middleware to all user routes
router.use(verifyToken);

// Profile routes (Any authenticated user)
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

// Admin/Teacher routes
router.get('/students', requireRole(['admin', 'teacher']), getAllStudents);

export default router;
