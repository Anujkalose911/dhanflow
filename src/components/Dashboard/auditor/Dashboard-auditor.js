// Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from '../../../utils/axios';
import KPICard from './KPICard';
import Header2 from '../../../Layouts/Headers/Header2';
import '../../../Assests/CSS/Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import DashboardTutorial from './DashboardTutorial';
import { 
  HiDocumentText, 
  HiExclamationCircle,
  HiFlag,
  HiBan
} from 'react-icons/hi';
import { FaHistory } from 'react-icons/fa';
import './Dashboard-auditor.css';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    statistics: {
      total_audit_logs: 0,
      flagged_invoices: 0,
      high_priority_audits: 0,
      rejected_invoices: 0,
      pending_reviews: 0,
      flagged_audits: 0
    },
    recent_activities: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [runTutorial, setRunTutorial] = useState(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenAuditorDashboardTutorial');
    return !hasSeenTutorial;
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const access_token = localStorage.getItem('access_token');
        
        if (!access_token) {
          toast.error('Please login to access dashboard');
          navigate('/signin');
          return;
        }

        const response = await axios.get('/get-auditor-dashboard-data', {
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        });

        if (response.data.success) {
          setDashboardData(response.data.data);
        } else {
          setError(response.data.message || 'Failed to fetch dashboard data');
          toast.error(response.data.message || 'Failed to fetch dashboard data');
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        const errorMessage = error.response?.data?.message || 'Error loading dashboard data';
        setError(errorMessage);
        toast.error(errorMessage);
        
        if (error.response?.status === 401) {
          navigate('/signin');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

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

  const handleViewAuditLogs = () => {
    navigate('/audit-logs');
  };

  const handleViewFlaggedInvoices = () => {
    navigate('/flagged-invoices');
  };

  const kpiData = {
    kpis: [
      {
        title: 'Total Audit Logs',
        value: dashboardData.statistics.total_audit_logs,
        icon: <HiDocumentText className="kpi-icon-inner" />,
        type: 'audit-logs'
      },
      {
        title: 'Flagged Invoices',
        value: dashboardData.statistics.flagged_invoices,
        icon: <HiFlag className="kpi-icon-inner" />,
        type: 'flagged'
      },
      {
        title: 'High Priority Audits',
        value: dashboardData.statistics.high_priority_audits,
        icon: <HiExclamationCircle className="kpi-icon-inner" />,
        type: 'priority'
      },
      {
        title: 'Rejected Invoices',
        value: dashboardData.statistics.rejected_invoices,
        icon: <HiBan className="kpi-icon-inner" />,
        type: 'rejected'
      },
      {
        title: 'Pending Reviews',
        value: dashboardData.statistics.pending_reviews,
        icon: <FaHistory className="kpi-icon-inner" />,
        type: 'pending'
      },
      {
        title: 'Flagged Audits',
        value: dashboardData.statistics.flagged_audits,
        icon: <HiFlag className="kpi-icon-inner" />,
        type: 'flagged'
      }
    ]
  };

  return (
    <section>
      <Header2 />
      <div className="tutorial-button-container">
        <button 
          className="tutorial-button"
          onClick={() => setRunTutorial(true)}
        >
          Show Tutorial
        </button>
      </div>

      <DashboardTutorial 
        run={runTutorial}
        handleClose={() => setRunTutorial(false)}
      />

      <div className="dashboard auditor-dashboard">
        <div className="dashboard-header">
          <h1>Auditor Dashboard</h1>
          <div className="action-buttons">
            <button className="btn" onClick={handleViewAuditLogs}>View Audit Logs</button>
            <button className="btn" onClick={handleViewFlaggedInvoices}>Flagged Invoices</button>
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
          <h2>Recent Audit Activities</h2>
          <div className="activity-list">
            {dashboardData.recent_activities.length > 0 ? (
              dashboardData.recent_activities.map((activity, index) => (
                <div key={index} className="activity-item">
                  <span className="activity-description">
                    {activity.description}
                  </span>
                  <span className="time">
                    {new Date(activity.timestamp).toLocaleString()}
                  </span>
                </div>
              ))
            ) : (
              <div className="activity-item">
                <span>No recent audit activities</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;