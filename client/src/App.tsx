import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StudentLayout } from './components/layout/StudentLayout';
import DashboardPage from './pages/student/DashboardPage';
import DoubtSystemPage from './pages/student/DoubtSystemPage';
import SubjectDrivePage from './pages/student/SubjectDrivePage';
import FeedbackPage from './pages/student/FeedbackPage';
import CollaborationPage from './pages/student/CollaborationPage';
import InternshipPage from './pages/student/InternshipPage';
import PublicDrivePage from './pages/public/PublicDrivePage';

import HomePage from './pages/public/HomePage';
import RegisterPage from './pages/public/RegisterPage';

import { TeacherLayout } from './components/layout/TeacherLayout';
import TeacherDashboardPage from './pages/teacher/TeacherDashboardPage';

import { AdminLayout } from './components/layout/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import UserManagementPage from './pages/admin/UserManagementPage';
import NotificationCenterPage from './pages/admin/NotificationCenterPage';
import { AuthProvider } from './contexts/AuthContext';
import ScheduleUploadPage from './pages/teacher/ScheduleUploadPage';
import RequestManagementPage from './pages/teacher/RequestManagementPage';
import { Toaster } from 'sonner';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/drive" element={<PublicDrivePage />} />
        
        {/* Student Routes */}
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="doubts" element={<DoubtSystemPage />} />
          <Route path="drive" element={<SubjectDrivePage />} />
          <Route path="feedback" element={<FeedbackPage />} />
          <Route path="collaboration" element={<CollaborationPage />} />
          <Route path="internships" element={<InternshipPage />} />
          <Route path="settings" element={<div className="p-10">Settings Coming Soon</div>} />
        </Route>

        {/* Teacher Routes */}
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<TeacherDashboardPage />} />
          <Route path="schedule" element={<ScheduleUploadPage />} />
          <Route path="requests" element={<RequestManagementPage />} />
          <Route path="drive" element={<div className="p-10">Manage Drive Coming Soon</div>} />
          <Route path="feedback" element={<div className="p-10">Feedback Analytics Coming Soon</div>} />
          <Route path="settings" element={<div className="p-10">Settings Coming Soon</div>} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="notifications" element={<NotificationCenterPage />} />
          <Route path="approvals" element={<div className="p-10">Teacher Approvals Coming Soon</div>} />
          <Route path="internships" element={<div className="p-10">Internship Moderation Coming Soon</div>} />
          <Route path="logs" element={<div className="p-10">System Logs Coming Soon</div>} />
          <Route path="settings" element={<div className="p-10">Settings Coming Soon</div>} />
        </Route>
      </Routes>
      <Toaster position="top-right" richColors />
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
