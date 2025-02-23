import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import './Assests/CSS/Dashboard.css';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthProvider, AuthCallbackRoute } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Loader from "./components/Loader/Loader";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import ERP from "./components/ERP/ERP";
import TallyIntro from "./components/TallyIntro/TallyIntro";
import TallySupport from "./components/TallySupport/TallySupport";
import Home from "./components/Home/Home";
import Calendar from "./components/Calendar/Calendar.js";
import PendingInstallments from "./components/PendingInstallments/PendingInstallments";
import MultipleRegisterVendor from "./components/MultipleRegisterVendor/MultipleRegisterVendor";
import Dashboard from "./components/Dashboard/admin/Dashboard";
import DashboardAccountant from "./components/Dashboard/accountant/Dashboard-accountant";
import DashboardAuditor from "./components/Dashboard/auditor/Dashboard-auditor";
import DashboardOperator from "./components/Dashboard/operator/Dashboard-operator";
import UserManagement from "./components/user-management/user-management.js";
import InvoiceManagement from "./components/invoice-management/InvoiceManagement";
import { AuditLogPage } from "./components/audit-logs/audit-logs";
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthContext';
import DashboardManager from "./components/Dashboard/manager/Dashboard-manager";

const RoleBasedRoute = ({ element, allowedRole, allowedRoles }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const checkAccess = () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        navigate('/signin');
        return;
      }

      try {
        const tokenParts = token.split('.');
        const payload = JSON.parse(atob(tokenParts[1]));
        const userRole = payload.role.toLowerCase();

        // Check for multiple allowed roles first
        if (allowedRoles && Array.isArray(allowedRoles)) {
          if (allowedRoles.map(role => role.toLowerCase()).includes(userRole)) {
            setHasAccess(true);
            setLoading(false);
            return;
          }
        }
        
        // Fall back to single role check
        if (allowedRole && userRole === allowedRole.toLowerCase()) {
          setHasAccess(true);
        } else {
          // Redirect based on role
          if (userRole === 'auditor') {
            navigate('/dashboard');
          } else if (userRole === 'admin') {
            navigate('/admin-dashboard');
          } else if (userRole === 'operator') {
            navigate('/operator-dashboard');
          } else if (userRole === 'accountant') {
            navigate('/accountant-dashboard');
          } else if (userRole === 'manager') {
            navigate('/manager-dashboard');
          } else {
            navigate('/home');
          }
        }
      } catch (error) {
        console.error('Error checking role:', error);
        navigate('/signin');
      }
      setLoading(false);
    };

    checkAccess();
  }, [navigate, allowedRole, allowedRoles]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return hasAccess ? element : null;
};

const App = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Only handle initial page load
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this only runs once on mount

  // Clear auth state when window is closed
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('isAuthenticated');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return (
    <AuthProvider>
      <div className="app-container">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
        {loading && <Loader />}
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/calendar" element={<ProtectedRoute><Calendar/></ProtectedRoute>} />
          <Route path="/multiplevendor" element={<ProtectedRoute><MultipleRegisterVendor /></ProtectedRoute>} />
          <Route 
            path="/dashboard" 
            element={
              <RoleBasedRoute
                element={
                  (() => {
                    const token = localStorage.getItem('access_token');
                    if (token) {
                      const payload = JSON.parse(atob(token.split('.')[1]));
                      const userRole = payload.role.toLowerCase();
                      if (userRole === 'auditor') return <DashboardAuditor />;
                      if (userRole === 'admin') return <Dashboard />;
                      if (userRole === 'operator') return <DashboardOperator />;
                      if (userRole === 'accountant') return <DashboardAccountant />;
                      if (userRole === 'manager') return <DashboardManager />;
                    }
                    return <Home />;
                  })()
                }
                allowedRole={(() => {
                  const token = localStorage.getItem('access_token');
                  if (token) {
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    return payload.role.toLowerCase();
                  }
                  return '';
                })()}
              />
            } 
          />
          <Route 
            path="/admin-dashboard" 
            element={
              <RoleBasedRoute
                element={<Dashboard />}
                allowedRole="admin"
              />
            } 
          />
          <Route 
            path="/operator-dashboard" 
            element={
              <RoleBasedRoute
                element={<DashboardOperator />}
                allowedRole="operator"
              />
            } 
          />
          <Route 
            path="/accountant-dashboard" 
            element={
              <RoleBasedRoute
                element={<DashboardAccountant />}
                allowedRole="accountant"
              />
            } 
          />
          <Route 
            path="/manager-dashboard" 
            element={
              <RoleBasedRoute
                element={<DashboardManager />}
                allowedRole="manager"
              />
            } 
          />
          <Route path="/installments" element={<ProtectedRoute><PendingInstallments /></ProtectedRoute>} />
          <Route path="/tallysupport" element={
            <ProtectedRoute>
              <RoleBasedRoute
                element={<TallySupport />}
                allowedRoles={['admin', 'operator']}
              />
            </ProtectedRoute>
          } />
          <Route path="/erp" element={<ProtectedRoute><ERP /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/tallyintro" element={
            <ProtectedRoute
              element={
                <RoleBasedRoute
                  allowedRole="admin"
                >
                  <TallyIntro />
                </RoleBasedRoute>
              }
            />
          } />
          <Route path="/user-management" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
          <Route path="/invoice-management" element={<ProtectedRoute><InvoiceManagement /></ProtectedRoute>} />
          <Route path="/audit-logs" element={<ProtectedRoute><AuditLogPage /></ProtectedRoute>} />
          <Route path="/auth/callback" element={<AuthCallbackRoute />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;