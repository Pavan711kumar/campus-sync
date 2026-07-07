"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProjects = exports.createProject = void 0;
const firebase_1 = require("../config/firebase");
const uuid_1 = require("uuid");
const createProject = async (req, res) => {
    try {
        const studentId = req.user?.uid;
        const { title, description, skillsRequired, lookingFor } = req.body;
        if (!title || !description) {
            res.status(400).json({ error: 'Bad Request', message: 'Missing required fields' });
            return;
        }
        const projectId = (0, uuid_1.v4)();
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
        await firebase_1.adminDb.collection('projects').doc(projectId).set(projectData);
        res.status(201).json({ message: 'Project created successfully', data: projectData });
    }
    catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};
exports.createProject = createProject;
const getAllProjects = async (req, res) => {
    try {
        const snapshot = await firebase_1.adminDb.collection('projects')
            .where('status', '==', 'active')
            .orderBy('createdAt', 'desc')
            .get();
        const projects = snapshot.docs.map(doc => doc.data());
        res.status(200).json(projects);
    }
    catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};
exports.getAllProjects = getAllProjects;
