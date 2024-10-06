import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AssetReturns from './components/AssetReturns';
import AuditLogs from './components/AuditLogs';
import Dashboard from './components/Dashboard';
import ExitInterviews from './components/ExitInterviews';
import Header from './components/Header';
import OffboardingList from './components/OffboardingList';
import Settings from './components/Settings';
import TaskManagement from './components/TaskManagement';
import OffboardingDetails from './pages/OffboardingDetails/page';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <div className='container'>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/offboarding" element={<OffboardingList />} />
            <Route path="/offboarding/:id" element={<OffboardingDetails />} />
            <Route path="/tasks" element={<TaskManagement />} />
            <Route path="/assets" element={<AssetReturns />} />
            <Route path="/interviews" element={<ExitInterviews />} />
            <Route path="/audit" element={<AuditLogs />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Router>
      </div>
    </>
  );
};
export default App;
