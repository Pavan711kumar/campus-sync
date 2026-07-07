"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const doubtController_1 = require("../controllers/doubtController");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
// Apply auth middleware to all doubt routes
router.use(auth_1.verifyToken);
// Students can create requests and accept requests
router.post('/', (0, auth_1.requireRole)(['student']), doubtController_1.createDoubtRequest);
router.get('/broadcast', (0, auth_1.requireRole)(['student', 'teacher']), doubtController_1.getBroadcastDoubts);
router.put('/:doubtId/accept', (0, auth_1.requireRole)(['student']), doubtController_1.acceptDoubtRequest);
exports.default = router;
