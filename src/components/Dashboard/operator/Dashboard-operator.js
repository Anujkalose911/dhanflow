// components/Dashboard.js
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
  HiClock,
  HiExclamationCircle,
  HiCheckCircle,
  HiBan
} from 'react-icons/hi';
import './Dashboard-operator.css';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    statistics: {
      total_invoices: 0,
      pending_invoices: 0,
      high_priority: 0,
      approved_invoices: 0,
      rejected_invoices: 0,
      today_uploads: 0
    },
    recent_activities: [],
    threshold_amount: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [runTutorial, setRunTutorial] = useState(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenOperatorDashboardTutorial');
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

        const response = await axios.get('/get-operator-dashboard-data', {
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

  const handleUploadInvoice = () => {
    navigate('/invoice-management');
  };

  const handleDownloadReports = async () => {
    try {
      const response = await axios.get('/download_report', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Invoice_Report_${new Date().toISOString().split('T')[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success('Report downloaded successfully');
    } catch (error) {
      toast.error('Failed to download report');
    }
  };

  const kpiData = {
    kpis: [
      {
        title: 'Total Invoices',
        value: dashboardData.statistics.total_invoices,
        icon: <HiDocumentText className="kpi-icon-inner" />,
        type: 'total'
      },
      {
        title: 'Pending Invoices',
        value: dashboardData.statistics.pending_invoices,
        icon: <HiClock className="kpi-icon-inner" />,
        type: 'pending'
      },
      {
        title: 'High Priority',
        value: dashboardData.statistics.high_priority,
        icon: <HiExclamationCircle className="kpi-icon-inner" />,
        type: 'priority'
      },
      {
        title: 'Approved Invoices',
        value: dashboardData.statistics.approved_invoices,
        icon: <HiCheckCircle className="kpi-icon-inner" />,
        type: 'approved'
      },
      {
        title: 'Rejected Invoices',
        value: dashboardData.statistics.rejected_invoices,
        icon: <HiBan className="kpi-icon-inner" />,
        type: 'rejected'
      },
      {
        title: "Today's Uploads",
        value: dashboardData.statistics.today_uploads,
        icon: <HiDocumentText className="kpi-icon-inner" />,
        type: 'today'
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

      <div className="dashboard operator-dashboard">
        <div className="dashboard-header">
          <h1>Operator Dashboard</h1>
          <div className="threshold-info">
            Threshold Amount: ₹{dashboardData.threshold_amount?.toLocaleString()}
          </div>
          <div className="action-buttons">
            <button className="btn" onClick={handleUploadInvoice}>Review Invoice</button>
            <button className="btn" onClick={handleDownloadReports}>
              
              Download Reports
            </button>
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
          <h2>Recent Activities</h2>
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
                <span>No recent activities</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;