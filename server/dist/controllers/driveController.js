"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSubjects = exports.getFilesBySubject = exports.uploadFileRecord = void 0;
const firebase_1 = require("../config/firebase");
const uuid_1 = require("uuid");
const uploadFileRecord = async (req, res) => {
    try {
        const uploaderId = req.user?.uid;
        const { name, url, subject, fileType, size } = req.body;
        if (!name || !url || !subject) {
            res.status(400).json({ error: 'Bad Request', message: 'Missing required fields' });
            return;
        }
        const fileId = (0, uuid_1.v4)();
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
        await firebase_1.adminDb.collection('subjectDrive').doc(fileId).set(fileRecord);
        res.status(201).json({ message: 'File record created successfully', data: fileRecord });
    }
    catch (error) {
        console.error('Error creating file record:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};
exports.uploadFileRecord = uploadFileRecord;
const getFilesBySubject = async (req, res) => {
    try {
        const { subject } = req.params;
        const snapshot = await firebase_1.adminDb.collection('subjectDrive')
            .where('subject', '==', subject)
            .get();
        const files = snapshot.docs.map(doc => doc.data());
        res.status(200).json(files);
    }
    catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};
exports.getFilesBySubject = getFilesBySubject;
const getAllSubjects = async (req, res) => {
    try {
        // In a real app, this might be a distinct collection, but for now we aggregate from files
        const snapshot = await firebase_1.adminDb.collection('subjectDrive').get();
        const subjectsSet = new Set();
        snapshot.docs.forEach(doc => {
            const data = doc.data();
            if (data.subject)
                subjectsSet.add(data.subject);
        });
        res.status(200).json(Array.from(subjectsSet));
    }
    catch (error) {
        console.error('Error fetching subjects:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};
exports.getAllSubjects = getAllSubjects;
