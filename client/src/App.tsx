import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StudentLayout } from './components/layout/StudentLayout';
import DashboardPage from './pages/student/DashboardPage';
import DoubtSystemPage from './pages/student/DoubtSystemPage';
import SubjectDrivePage from './pages/student/SubjectDrivePage';
import FeedbackPage from './pages/student/FeedbackPage';
import CollaborationPage from './pages/student/CollaborationPage';
import InternshipPage from './pages/student/InternshipPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to student dashboard temporarily */}
        <Route path="/" element={<Navigate to="/student" replace />} />
        
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
