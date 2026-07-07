import { Router } from 'express';
import { createInternship, getInternships } from '../controllers/internshipController';
import { verifyToken } from '../middlewares/auth';

const router = Router();

router.use(verifyToken);

router.post('/', createInternship);
router.get('/', getInternships);

export default router;
