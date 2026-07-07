import { Response } from 'express';
import { adminDb } from '../config/firebase';
import { AuthenticatedRequest } from '../middlewares/auth';
import { v4 as uuidv4 } from 'uuid';

export const createInternship = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    // Usually an admin or verified provider creates this
    if (req.user?.role !== 'admin' && req.user?.role !== 'teacher') {
      res.status(403).json({ error: 'Forbidden', message: 'Not authorized to create internships' });
      return;
    }

    const { company, role, stipend, duration, description, requirements } = req.body;

    if (!company || !role) {
      res.status(400).json({ error: 'Bad Request', message: 'Missing required fields' });
      return;
    }

    const internshipId = uuidv4();
    
    const internshipData = {
      id: internshipId,
      providerId: req.user.uid,
      company,
      role,
      stipend: stipend || 'Unpaid',
      duration: duration || 'Not specified',
      description: description || '',
      requirements: requirements || [],
      status: 'open',
      createdAt: new Date().toISOString(),
    };

    await adminDb.collection('internships').doc(internshipId).set(internshipData);

    res.status(201).json({ message: 'Internship created successfully', data: internshipData });
  } catch (error: any) {
    console.error('Error creating internship:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

export const getInternships = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const snapshot = await adminDb.collection('internships')
      .where('status', '==', 'open')
      .orderBy('createdAt', 'desc')
      .get();
      
    const internships = snapshot.docs.map(doc => doc.data());
    
    res.status(200).json(internships);
  } catch (error: any) {
    console.error('Error fetching internships:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};
