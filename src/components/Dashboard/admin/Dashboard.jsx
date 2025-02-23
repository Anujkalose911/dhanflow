import React, { useState, useEffect } from 'react';
import axios from '../../../utils/axios';
import KPICard from './KPICard';
import Header2 from '../../../Layouts/Headers/Header2';
import '../../../Assests/CSS/Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import DashboardTutorial from './DashboardTutorial';
import { 
  HiUsers, 
  HiDocumentText, 
  HiClock, 
  HiBan,
  HiExclamationCircle,
} from 'react-icons/hi';
import { FaRupeeSign } from 'react-icons/fa';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    statistics: {
      total_active_users: 0,
      total_invoices: 0,
      pending_approvals: 0,
      rejected_invoices: 0,
      overdue_invoices: 0,
      high_value_transactions: 0
    },
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [runTutorial, setRunTutorial] = useState(false);

 
  useEffect(() => {
    const fetchDashboardData = async () => {
     
      try {
        setLoading(true);
        
        // Get access token from localStorage
        const access_token = localStorage.getItem('access_token');
        
        
        if (!access_token) {
          toast.error('Please login to access dashboard');
          navigate('/signin');
          return;
        }

        // Try to decode the token to check if it's valid
        try {
          
          const tokenParts = access_token.split('.');
          
          const payload = JSON.parse(atob(tokenParts[1]));
          

          if (payload.exp && payload.exp * 1000 < Date.now()) {
            
            toast.error('Session expired. Please login again');
            navigate('/signin');
            return;
          }

          // Check for admin access based on msme_id or other fields
          if (!payload.msme_id) {
            
            toast.error('Invalid session. Please login again');
            navigate('/signin');
            return;
          }

          // Log token info for debugging
          
        } catch (e) {
          console.error('Token decode error:', e.message); // More detailed error
          toast.error('Invalid session. Please login again');
          navigate('/signin');
          return;
        }

       
        
        // Create headers exactly like check-auth
        const headers = {
          'Authorization': `Bearer ${access_token}`
        };
        

        const response = await axios.get('/get-admin-dashboard-data', { headers });
        
        
        
        if (response.data.success) {
          
          setDashboardData(response.data.data);
        } else {
          
          setError('Failed to fetch dashboard data');
          toast.error(response.data.message || 'Failed to fetch dashboard data');
        }
      } catch (error) {
        console.error('API Error details:', {
          status: error.response?.status,
          message: error.message,
          response: error.response?.data
        }); // Detailed error logging
        
        if (error.response?.status === 401) {
          // Check if token is actually expired
          try {
            const token = localStorage.getItem('access_token');
            if (token) {
              const tokenParts = token.split('.');
              const payload = JSON.parse(atob(tokenParts[1]));
              const currentTime = Date.now() / 1000;
              
              // Only logout if token is actually expired
              if (payload.exp < currentTime) {
                toast.error('Session expired. Please login again');
                navigate('/signin');
              } else {
                // Token is valid but request failed
                toast.error('Error loading dashboard data. Please try again.');
                setError('Failed to load dashboard data');
              }
            }
          } catch (e) {
            console.error('Error checking token expiration:', e);
            toast.error('Session error. Please login again');
            navigate('/signin');
          }
        } else if (error.response?.status === 403) {
          toast.error('You do not have permission to access this page');
          navigate('/home');
        } else {
          setError('Error loading dashboard data');
          toast.error(error.response?.data?.message || 'Error loading dashboard data');
        }
      } finally {
        setLoading(false);
      }
    };

    
    fetchDashboardData();
  }, [navigate]);

  useEffect(() => {
    // Check if it's the first visit
    const hasSeenTutorial = localStorage.getItem('dashboard-tutorial-completed');
    if (!hasSeenTutorial) {
      setRunTutorial(true);
    }
  }, []);

  if (loading) return (
    <section>
      <Header2 />
      <div className="loading">Loading dashboard...</div>
    </section>
  );

  if (error) return (
    <section>
      <Header2 />
      <div className="error">{error}</div>
    </section>
  );

  if (!dashboardData) return (
    <section>
      <Header2 />
      <div className="error">No dashboard data available</div>
    </section>
  );

  const handleManageUsers = () => {
    // Get access token from localStorage
    const access_token = localStorage.getItem('access_token');
    if (!access_token) {
      toast.error('Please login to access user management');
      navigate('/signin');
      return;
    }

    try {
      // Decode the token to check role
      const tokenParts = access_token.split('.');
      const payload = JSON.parse(atob(tokenParts[1]));
      
      if (payload.role.toLowerCase() !== 'admin') {
        toast.error('You do not have permission to access user management');
        return;
      }

      // If role check passes, navigate to user management
      navigate('/user-management');
    } catch (error) {
      console.error('Error checking permissions:', error);
      toast.error('Error checking permissions. Please try again.');
    }
  };

  const handleViewAuditLogs = () => {
    // Get access token from localStorage
    const access_token = localStorage.getItem('access_token');
    if (!access_token) {
      toast.error('Please login to view audit logs');
      navigate('/signin');
      return;
    }

    try {
      // Decode the token to check role
      const tokenParts = access_token.split('.');
      const payload = JSON.parse(atob(tokenParts[1]));
      
      if (!['admin', 'auditor'].includes(payload.role.toLowerCase())) {
        toast.error('You do not have permission to view audit logs');
        return;
      }

      // If role check passes, navigate to audit logs
      navigate('/audit-logs');
    } catch (error) {
      console.error('Error checking permissions:', error);
      toast.error('Error checking permissions. Please try again.');
    }
  };

  const handleDownloadReports = async () => {
    // Get access token from localStorage
    const access_token = localStorage.getItem('access_token');
    if (!access_token) {
      toast.error('Please login to download reports');
      navigate('/signin');
      return;
    }

    try {
      // Decode the token to check role
      const tokenParts = access_token.split('.');
      const payload = JSON.parse(atob(tokenParts[1]));
      
      if (!['admin', 'accountant', 'manager'].includes(payload.role.toLowerCase())) {
        toast.error('You do not have permission to download reports');
        return;
      }

      // If role check passes, download the report
      const response = await axios.get('/download_report', {
        headers: {
          'Authorization': `Bearer ${access_token}`
        },
        responseType: 'blob' // Important for downloading files
      });

      // Create a blob from the response data
      const blob = new Blob([response.data], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      });
      
      // Create a link element and trigger download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const filename = `Invoice_Report_${new Date().toISOString().split('T')[0]}.xlsx`;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success('Report downloaded successfully');
    } catch (error) {
      console.error('Error downloading report:', error);
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again');
        navigate('/signin');
      } else if (error.response?.status === 403) {
        toast.error('You do not have permission to download reports');
      } else {
        toast.error('Error downloading report. Please try again.');
      }
    }
  };

  const handleStartTutorial = () => {
    setRunTutorial(true);
  };

  const kpiData = {
    kpis: [
      {
        title: 'Total Active Users',
        value: dashboardData.statistics.total_active_users,
        icon: <HiUsers className="kpi-icon-inner" />,
        type: 'users'
      },
      {
        title: 'Total Invoices',
        value: dashboardData.statistics.total_invoices,
        icon: <HiDocumentText className="kpi-icon-inner" />,
        type: 'invoices'
      },
      {
        title: 'Pending Approvals',
        value: dashboardData.statistics.pending_approvals,
        icon: <HiClock className="kpi-icon-inner" />,
        type: 'pending'
      },
      {
        title: 'Rejected Invoices',
        value: dashboardData.statistics.rejected_invoices,
        icon: <HiBan className="kpi-icon-inner" />,
        type: 'rejected'
      },
      {
        title: 'Overdue Invoices',
        value: dashboardData.statistics.overdue_invoices,
        icon: <HiExclamationCircle className="kpi-icon-inner" />,
        type: 'overdue'
      },
      {
        title: 'High-Value Transactions',
        value: dashboardData.statistics.high_value_transactions,
        icon: <FaRupeeSign className="kpi-icon-inner" />,
        type: 'high-value'
      }
    ]
  };

  return (
    <section>
      <Header2 />
      <br></br>
      <div className="tutorial-button-container">
      <button 
        className="tutorial-button"
        onClick={() => setRunTutorial(true)}
      >
        Show Tutorial
      </button>
      </div>
      <br></br>
      <DashboardTutorial 
        run={runTutorial}
        handleClose={() => setRunTutorial(false)}
      />
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <div className="action-buttons">
            <button className="btn" onClick={handleManageUsers}>Manage Users</button>
            <button className="btn" onClick={handleViewAuditLogs}>View Audit Logs</button>
            <button className="btn" onClick={handleDownloadReports}>Download Reports</button>
          </div>
        </div>

        <div className="kpi-grid">
          {kpiData.kpis.map((kpi, index) => (
            <KPICard
              key={index}
              title={kpi.title}
              value={kpi.value}
              icon={kpi.icon}
              type={kpi.type}
            />
          ))}
        </div>

        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {dashboardData.recentActivity.length > 0 ? (
              dashboardData.recentActivity.map((activity, index) => (
                <div key={index} className="activity-item">
                  <span>{activity.details}</span>
                  <span className="time">
                    {new Date(activity.timestamp).toLocaleString()}
                  </span>
                </div>
              ))
            ) : (
              <div className="activity-item">
                <span>No recent activity</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard; 