"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllStudents = exports.updateProfile = exports.getProfile = void 0;
const firebase_1 = require("../config/firebase");
const getProfile = async (req, res) => {
    try {
        const uid = req.user?.uid;
        if (!uid) {
            res.status(401).json({ error: 'Unauthorized', message: 'User ID missing' });
            return;
        }
        const userDoc = await firebase_1.adminDb.collection('users').doc(uid).get();
        if (!userDoc.exists) {
            // Sync from auth if not in firestore yet
            const authUser = await firebase_1.adminAuth.getUser(uid);
            const newUserData = {
                uid: authUser.uid,
                email: authUser.email,
                fullName: authUser.displayName || 'New User',
                role: 'student', // default
                createdAt: new Date().toISOString()
            };
            await firebase_1.adminDb.collection('users').doc(uid).set(newUserData);
            res.status(200).json(newUserData);
            return;
        }
        res.status(200).json(userDoc.data());
    }
    catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res) => {
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
        await firebase_1.adminDb.collection('users').doc(uid).update(updateData);
        const updatedDoc = await firebase_1.adminDb.collection('users').doc(uid).get();
        res.status(200).json(updatedDoc.data());
    }
    catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};
exports.updateProfile = updateProfile;
const getAllStudents = async (req, res) => {
    try {
        const snapshot = await firebase_1.adminDb.collection('users').where('role', '==', 'student').get();
        const students = snapshot.docs.map((doc) => doc.data());
        res.status(200).json(students);
    }
    catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};
exports.getAllStudents = getAllStudents;
