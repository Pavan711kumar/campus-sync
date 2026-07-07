"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
// Apply auth middleware to all user routes
router.use(auth_1.verifyToken);
// Profile routes (Any authenticated user)
router.get('/profile', userController_1.getProfile);
router.put('/profile', userController_1.updateProfile);
// Admin/Teacher routes
router.get('/students', (0, auth_1.requireRole)(['admin', 'teacher']), userController_1.getAllStudents);
exports.default = router;
