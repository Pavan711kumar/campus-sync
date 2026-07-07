"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptDoubtRequest = exports.getBroadcastDoubts = exports.createDoubtRequest = void 0;
const firebase_1 = require("../config/firebase");
const uuid_1 = require("uuid"); // need to install uuid
const createDoubtRequest = async (req, res) => {
    try {
        const studentId = req.user?.uid;
        const { title, description, subject, preferredTeacherId, requestType } = req.body;
        if (!title || !description || !subject || !requestType) {
            res.status(400).json({ error: 'Bad Request', message: 'Missing required fields' });
            return;
        }
        const doubtId = (0, uuid_1.v4)();
        const now = new Date();
        // 4 hours expiration for peer review
        const expiresAt = new Date(now.getTime() + 4 * 60 * 60 * 1000);
        const doubtData = {
            id: doubtId,
            studentId,
            title,
            description,
            subject,
            preferredTeacherId: preferredTeacherId || null,
            requestType, // Doubt, Guidance, Project Help
            status: 'Pending',
            createdAt: now.toISOString(),
            expiresAt: expiresAt.toISOString(),
            acceptedById: null
        };
        await firebase_1.adminDb.collection('doubtRequests').doc(doubtId).set(doubtData);
        res.status(201).json({ message: 'Doubt request created successfully', data: doubtData });
    }
    catch (error) {
        console.error('Error creating doubt request:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};
exports.createDoubtRequest = createDoubtRequest;
const getBroadcastDoubts = async (req, res) => {
    try {
        // Only show Pending doubts that haven't expired
        const snapshot = await firebase_1.adminDb.collection('doubtRequests')
            .where('status', '==', 'Pending')
            .get();
        const doubts = snapshot.docs.map(doc => doc.data());
        // Filter out expired ones on the read side (Cloud Function will handle real expiration later)
        const activeDoubts = doubts.filter(d => new Date(d.expiresAt) > new Date());
        res.status(200).json(activeDoubts);
    }
    catch (error) {
        console.error('Error fetching broadcast doubts:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};
exports.getBroadcastDoubts = getBroadcastDoubts;
const acceptDoubtRequest = async (req, res) => {
    try {
        const acceptorId = req.user?.uid;
        const { doubtId } = req.params;
        const doubtRef = firebase_1.adminDb.collection('doubtRequests').doc(doubtId);
        await firebase_1.adminDb.runTransaction(async (t) => {
            const doc = await t.get(doubtRef);
            if (!doc.exists) {
                throw new Error('Doubt request not found');
            }
            const data = doc.data();
            if (data?.status !== 'Pending') {
                throw new Error('This request is no longer available');
            }
            t.update(doubtRef, {
                status: 'AcceptedByStudent',
                acceptedById: acceptorId
            });
        });
        res.status(200).json({ message: 'Doubt request accepted successfully' });
    }
    catch (error) {
        console.error('Error accepting doubt:', error);
        if (error.message === 'This request is no longer available' || error.message === 'Doubt request not found') {
            res.status(400).json({ error: 'Bad Request', message: error.message });
        }
        else {
            res.status(500).json({ error: 'Internal Server Error', message: 'Failed to accept doubt request' });
        }
    }
};
exports.acceptDoubtRequest = acceptDoubtRequest;
