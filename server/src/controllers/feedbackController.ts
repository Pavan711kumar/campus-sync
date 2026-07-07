import { Response } from 'express';
import { adminDb } from '../config/firebase';
import { AuthenticatedRequest } from '../middlewares/auth';
import { v4 as uuidv4 } from 'uuid';

export const submitFeedback = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const studentId = req.user?.uid;
    const { teacherId, subject, rating, comment, isAnonymous } = req.body;

    if (!teacherId || !rating || !comment) {
      res.status(400).json({ error: 'Bad Request', message: 'Missing required fields' });
      return;
    }

    const feedbackId = uuidv4();
    
    // Simple mock sentiment analysis for now
    const positiveWords = ['great', 'excellent', 'good', 'amazing', 'helpful', 'clear'];
    const negativeWords = ['bad', 'poor', 'unclear', 'confusing', 'terrible', 'worst'];
    
    let sentimentScore = 0;
    const lowerComment = comment.toLowerCase();
    
    positiveWords.forEach(word => { if (lowerComment.includes(word)) sentimentScore += 1; });
    negativeWords.forEach(word => { if (lowerComment.includes(word)) sentimentScore -= 1; });
    
    let sentiment = 'neutral';
    if (sentimentScore > 0) sentiment = 'positive';
    if (sentimentScore < 0) sentiment = 'negative';

    const feedbackData = {
      id: feedbackId,
      studentId: isAnonymous ? 'anonymous' : studentId,
      teacherId,
      subject: subject || 'General',
      rating,
      comment,
      sentiment,
      isAnonymous: !!isAnonymous,
      createdAt: new Date().toISOString(),
    };

    await adminDb.collection('feedbacks').doc(feedbackId).set(feedbackData);

    res.status(201).json({ message: 'Feedback submitted successfully', data: feedbackData });
  } catch (error: any) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

export const getTeacherFeedback = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const teacherId = req.user?.uid;
    // Ensure only the teacher or admin can fetch this
    if (req.user?.role !== 'teacher' && req.user?.role !== 'admin') {
      res.status(403).json({ error: 'Forbidden', message: 'Not authorized to view feedback' });
      return;
    }

    const snapshot = await adminDb.collection('feedbacks')
      .where('teacherId', '==', teacherId)
      .orderBy('createdAt', 'desc')
      .get();
      
    const feedbacks = snapshot.docs.map(doc => doc.data());
    
    res.status(200).json(feedbacks);
  } catch (error: any) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};
