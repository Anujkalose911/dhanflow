import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/Dashboard';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import Home from './components/Home/Home';
import ERP from './components/ERP/ERP';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import './styles/main.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route 
              path="/home" 
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/erp" 
              element={
                <ProtectedRoute>
                  <ERP />
                </ProtectedRoute>
              } 
            />
            {/* Add other routes here */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; 