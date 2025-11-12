import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
