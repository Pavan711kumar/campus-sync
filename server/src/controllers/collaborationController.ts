import { Response } from 'express';
import { adminDb } from '../config/firebase';
import { AuthenticatedRequest } from '../middlewares/auth';
import { v4 as uuidv4 } from 'uuid';

export const createProject = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const studentId = req.user?.uid;
    const { title, description, skillsRequired, lookingFor } = req.body;

    if (!title || !description) {
      res.status(400).json({ error: 'Bad Request', message: 'Missing required fields' });
      return;
    }

    const projectId = uuidv4();
    
    const projectData = {
      id: projectId,
      ownerId: studentId,
      title,
      description,
      skillsRequired: skillsRequired || [],
      lookingFor: lookingFor || 'Open to collaboration',
      createdAt: new Date().toISOString(),
      status: 'active'
    };

    await adminDb.collection('projects').doc(projectId).set(projectData);

    res.status(201).json({ message: 'Project created successfully', data: projectData });
  } catch (error: any) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

export const getAllProjects = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const snapshot = await adminDb.collection('projects')
      .where('status', '==', 'active')
      .orderBy('createdAt', 'desc')
      .get();
      
    const projects = snapshot.docs.map(doc => doc.data());
    
    res.status(200).json(projects);
  } catch (error: any) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};
