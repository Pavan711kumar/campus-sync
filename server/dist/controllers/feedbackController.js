"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeacherFeedback = exports.submitFeedback = void 0;
const firebase_1 = require("../config/firebase");
const uuid_1 = require("uuid");
const submitFeedback = async (req, res) => {
    try {
        const studentId = req.user?.uid;
        const { teacherId, subject, rating, comment, isAnonymous } = req.body;
        if (!teacherId || !rating || !comment) {
            res.status(400).json({ error: 'Bad Request', message: 'Missing required fields' });
            return;
        }
        const feedbackId = (0, uuid_1.v4)();
        // Simple mock sentiment analysis for now
        const positiveWords = ['great', 'excellent', 'good', 'amazing', 'helpful', 'clear'];
        const negativeWords = ['bad', 'poor', 'unclear', 'confusing', 'terrible', 'worst'];
        let sentimentScore = 0;
        const lowerComment = comment.toLowerCase();
        positiveWords.forEach(word => { if (lowerComment.includes(word))
            sentimentScore += 1; });
        negativeWords.forEach(word => { if (lowerComment.includes(word))
            sentimentScore -= 1; });
        let sentiment = 'neutral';
        if (sentimentScore > 0)
            sentiment = 'positive';
        if (sentimentScore < 0)
            sentiment = 'negative';
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
        await firebase_1.adminDb.collection('feedbacks').doc(feedbackId).set(feedbackData);
        res.status(201).json({ message: 'Feedback submitted successfully', data: feedbackData });
    }
    catch (error) {
        console.error('Error submitting feedback:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};
exports.submitFeedback = submitFeedback;
const getTeacherFeedback = async (req, res) => {
    try {
        const teacherId = req.user?.uid;
        // Ensure only the teacher or admin can fetch this
        if (req.user?.role !== 'teacher' && req.user?.role !== 'admin') {
            res.status(403).json({ error: 'Forbidden', message: 'Not authorized to view feedback' });
            return;
        }
        const snapshot = await firebase_1.adminDb.collection('feedbacks')
            .where('teacherId', '==', teacherId)
            .orderBy('createdAt', 'desc')
            .get();
        const feedbacks = snapshot.docs.map(doc => doc.data());
        res.status(200).json(feedbacks);
    }
    catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};
exports.getTeacherFeedback = getTeacherFeedback;
