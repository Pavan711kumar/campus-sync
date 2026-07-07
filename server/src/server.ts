import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

import userRoutes from './routes/userRoutes';
import doubtRoutes from './routes/doubtRoutes';
import driveRoutes from './routes/driveRoutes';
import feedbackRoutes from './routes/feedbackRoutes';
import collaborationRoutes from './routes/collaborationRoutes';
import internshipRoutes from './routes/internshipRoutes';

// Basic health check
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'CampusSync Server is running' });
});

app.use('/api/users', userRoutes);
app.use('/api/doubts', doubtRoutes);
app.use('/api/drive', driveRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/collaboration', collaborationRoutes);
app.use('/api/internships', internshipRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
