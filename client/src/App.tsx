import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StudentLayout } from './components/layout/StudentLayout';
import DashboardPage from './pages/student/DashboardPage';
import DoubtSystemPage from './pages/student/DoubtSystemPage';
import SubjectDrivePage from './pages/student/SubjectDrivePage';

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
          <Route path="feedback" element={<div className="p-10">Feedback Coming Soon</div>} />
          <Route path="collaboration" element={<div className="p-10">Collaboration Coming Soon</div>} />
          <Route path="settings" element={<div className="p-10">Settings Coming Soon</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
