import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DataStudioPage from './pages/DataStudioPage';
import IntelligenceDashboard from './pages/IntelligenceDashboard';
import InvestigationWorkspace from './pages/InvestigationWorkspace';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DataStudioPage />} />
        <Route path="/data-studio" element={<DataStudioPage />} />
        <Route path="/dashboard" element={<IntelligenceDashboard />} />
        <Route path="/investigation/:id" element={<InvestigationWorkspace />} />
        <Route path="/investigation" element={<InvestigationWorkspace />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
