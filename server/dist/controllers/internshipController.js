"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInternships = exports.createInternship = void 0;
const firebase_1 = require("../config/firebase");
const uuid_1 = require("uuid");
const createInternship = async (req, res) => {
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
        const internshipId = (0, uuid_1.v4)();
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
        await firebase_1.adminDb.collection('internships').doc(internshipId).set(internshipData);
        res.status(201).json({ message: 'Internship created successfully', data: internshipData });
    }
    catch (error) {
        console.error('Error creating internship:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};
exports.createInternship = createInternship;
const getInternships = async (req, res) => {
    try {
        const snapshot = await firebase_1.adminDb.collection('internships')
            .where('status', '==', 'open')
            .orderBy('createdAt', 'desc')
            .get();
        const internships = snapshot.docs.map(doc => doc.data());
        res.status(200).json(internships);
    }
    catch (error) {
        console.error('Error fetching internships:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};
exports.getInternships = getInternships;
