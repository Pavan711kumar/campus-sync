import { Router } from 'express';
import { createProject, getAllProjects } from '../controllers/collaborationController';
import { verifyToken } from '../middlewares/auth';

const router = Router();

router.use(verifyToken);

router.post('/projects', createProject);
router.get('/projects', getAllProjects);

export default router;
