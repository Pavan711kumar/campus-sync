import { Response } from 'express';
import { adminDb, adminAuth } from '../config/firebase';
import { AuthenticatedRequest } from '../middlewares/auth';

export const getProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const uid = req.user?.uid;
    if (!uid) {
      res.status(401).json({ error: 'Unauthorized', message: 'User ID missing' });
      return;
    }

    const userDoc = await adminDb.collection('users').doc(uid).get();
    
    if (!userDoc.exists) {
      // Sync from auth if not in firestore yet
      const authUser = await adminAuth.getUser(uid);
      const newUserData = {
        uid: authUser.uid,
        email: authUser.email,
        fullName: authUser.displayName || 'New User',
        role: 'student', // default
        createdAt: new Date().toISOString()
      };
      await adminDb.collection('users').doc(uid).set(newUserData);
      res.status(200).json(newUserData);
      return;
    }

    res.status(200).json(userDoc.data());
  } catch (error: any) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

export const updateProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const uid = req.user?.uid;
    if (!uid) {
      res.status(401).json({ error: 'Unauthorized', message: 'User ID missing' });
      return;
    }

    const updateData = req.body;
    
    // Security: prevent user from updating their own role or uid directly
    delete updateData.role;
    delete updateData.uid;

    await adminDb.collection('users').doc(uid).update(updateData);
    
    const updatedDoc = await adminDb.collection('users').doc(uid).get();
    res.status(200).json(updatedDoc.data());
  } catch (error: any) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

export const getAllStudents = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const snapshot = await adminDb.collection('users').where('role', '==', 'student').get();
    const students = snapshot.docs.map((doc: any) => doc.data());
    res.status(200).json(students);
  } catch (error: any) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};
