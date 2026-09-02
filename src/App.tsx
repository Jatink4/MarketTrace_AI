import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import IntelligenceDashboard from './pages/IntelligenceDashboard';
import InvestigationWorkspace from './pages/InvestigationWorkspace';
import DataStudioPage from './pages/DataStudioPage';
import { GovernancePage } from './pages/GovernancePage';
import { FeedbackPage } from './pages/FeedbackPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<IntelligenceDashboard />} />
        <Route path="/data-studio" element={<DataStudioPage />} />
        <Route path="/investigation/:id" element={<InvestigationWorkspace />} />
        <Route path="/investigation" element={<InvestigationWorkspace />} />
        <Route path="/governance" element={<GovernancePage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
