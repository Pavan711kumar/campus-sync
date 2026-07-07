import { Response } from 'express';
import { adminDb } from '../config/firebase';
import { AuthenticatedRequest } from '../middlewares/auth';
import { v4 as uuidv4 } from 'uuid';

export const uploadFileRecord = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const uploaderId = req.user?.uid;
    const { name, url, subject, fileType, size } = req.body;

    if (!name || !url || !subject) {
      res.status(400).json({ error: 'Bad Request', message: 'Missing required fields' });
      return;
    }

    const fileId = uuidv4();
    
    const fileRecord = {
      id: fileId,
      uploaderId,
      name,
      url,
      subject,
      fileType: fileType || 'unknown',
      size: size || 0,
      createdAt: new Date().toISOString(),
    };

    await adminDb.collection('subjectDrive').doc(fileId).set(fileRecord);

    res.status(201).json({ message: 'File record created successfully', data: fileRecord });
  } catch (error: any) {
    console.error('Error creating file record:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

export const getFilesBySubject = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { subject } = req.params;

    const snapshot = await adminDb.collection('subjectDrive')
      .where('subject', '==', subject)
      .get();
      
    const files = snapshot.docs.map(doc => doc.data());
    
    res.status(200).json(files);
  } catch (error: any) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

export const getAllSubjects = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    // In a real app, this might be a distinct collection, but for now we aggregate from files
    const snapshot = await adminDb.collection('subjectDrive').get();
    
    const subjectsSet = new Set<string>();
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      if (data.subject) subjectsSet.add(data.subject);
    });
    
    res.status(200).json(Array.from(subjectsSet));
  } catch (error: any) {
    console.error('Error fetching subjects:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};
