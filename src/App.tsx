import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useContext } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AssetReturns from './components/AssetReturns';
import AuditLogs from './components/AuditLogs';
import Dashboard from './components/Dashboard';
import ExitInterviews from './components/ExitInterviews';
import Header from './components/Header';
import Login from './components/Login';
import OffboardingList from './components/OffboardingList';
import TaskManagement from './components/TaskManagement';
import Unauthorized from './components/Unauthorized';
import { AuthContext, AuthProvider } from './context/AuthContext';
import OffboardingDetails from './pages/OffboardingDetails/page';

interface ProtectedRouteProps {
  element: React.ReactElement;
  requiredRole?: string;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, requiredRole }) => {
  const auth = useContext(AuthContext);
  if (auth?.loading) return <div>Loading...</div>;
  if (!auth?.user) return <Navigate to="/login" />;
  if (requiredRole && auth.user.role !== requiredRole) return <Navigate to="/unauthorized" />;
  return element;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div className='container'>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/offboarding" element={<ProtectedRoute element={<OffboardingList />}  />} />
            <Route path="/offboarding/:id" element={<ProtectedRoute element={<OffboardingDetails />} />} />
            <Route path="/tasks" element={<ProtectedRoute element={<TaskManagement />} />} />
            <Route path="/assets" element={<ProtectedRoute element={<AssetReturns />} />} />
            <Route path="/interviews" element={<ProtectedRoute element={<ExitInterviews />} />} />
            <Route path="/audit" element={<ProtectedRoute element={<AuditLogs />} requiredRole="ADMIN" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;