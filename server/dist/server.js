"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const doubtRoutes_1 = __importDefault(require("./routes/doubtRoutes"));
const driveRoutes_1 = __importDefault(require("./routes/driveRoutes"));
const feedbackRoutes_1 = __importDefault(require("./routes/feedbackRoutes"));
const collaborationRoutes_1 = __importDefault(require("./routes/collaborationRoutes"));
const internshipRoutes_1 = __importDefault(require("./routes/internshipRoutes"));
const path_1 = __importDefault(require("path"));
// Root endpoint replaced by static serving
// Serve static files from the React frontend app
app.use(express_1.default.static(path_1.default.join(__dirname, '../../client/dist')));
// Basic health check
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'CampusSync Server is running' });
});
app.use('/api/users', userRoutes_1.default);
app.use('/api/doubts', doubtRoutes_1.default);
app.use('/api/drive', driveRoutes_1.default);
app.use('/api/feedback', feedbackRoutes_1.default);
app.use('/api/collaboration', collaborationRoutes_1.default);
app.use('/api/internships', internshipRoutes_1.default);
// Catch-all handler for React Router
app.get(/(.*)/, (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../client/dist/index.html'));
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
