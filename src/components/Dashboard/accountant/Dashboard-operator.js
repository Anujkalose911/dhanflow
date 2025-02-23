// components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { 
  FaFileUpload, 
  FaClock, 
  FaExclamationTriangle, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaExclamationCircle,
  FaSync
} from 'react-icons/fa';
import '../../../Assests/CSS/Dashboard-accountant.css';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [kpiData, setKpiData] = useState({
    invoicesUploaded: 150,
    pendingUploads: 45,
    highPriorityUploads: 23,
  });
  const [recentActivities, setRecentActivities] = useState([]);

  // Simulate data fetching
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setRecentActivities([
        {
          id: 1,
          type: 'success',
          message: 'Invoice #1234 uploaded successfully',
          timestamp: '2 minutes ago',
          icon: <FaCheckCircle />
        },
        {
          id: 2,
          type: 'error',
          message: 'Upload failed for Invoice #1235',
          timestamp: '15 minutes ago',
          icon: <FaTimesCircle />
        },
        {
          id: 3,
          type: 'warning',
          message: 'High priority Invoice #1236 pending',
          timestamp: '1 hour ago',
          icon: <FaExclamationCircle />
        },
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Invoice Dashboard</h1>
      </div>
      
      {/* KPI Section */}
      <div className="section-header">
        <h2>Key Performance Indicators</h2>
      </div>
      <div className="kpi-container">
        <div className="kpi-card">
          <div className="kpi-icon uploaded">
            <FaFileUpload />
          </div>
          <div className="kpi-details">
            <h3>Invoices Uploaded</h3>
            <div className="kpi-number">{kpiData.invoicesUploaded}</div>
            <p className="kpi-description">Total uploads this month</p>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon pending">
            <FaClock />
          </div>
          <div className="kpi-details">
            <h3>Pending Uploads</h3>
            <div className="kpi-number">{kpiData.pendingUploads}</div>
            <p className="kpi-description">Awaiting upload</p>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon priority">
            <FaExclamationTriangle />
          </div>
          <div className="kpi-details">
            <h3>High Priority Uploads</h3>
            <div className="kpi-number">{kpiData.highPriorityUploads}</div>
            <p className="kpi-description">Urgent invoices</p>
          </div>
        </div>
      </div>

      {/* Recent Activities Section */}
      <div className="section-header">
        <h2>Recent Activities</h2>
        <button 
          className="refresh-button" 
          onClick={handleRefresh}
          disabled={isLoading}
        >
          <FaSync className={isLoading ? 'spinning' : ''} />
          {isLoading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
      <div className={`activities-container ${isLoading ? 'loading' : ''}`}>
        {isLoading ? (
          // Skeleton loading
          [...Array(3)].map((_, index) => (
            <div key={index} className="activity-card skeleton">
              <div className="activity-icon skeleton"></div>
              <div className="activity-details">
                <div className="skeleton" style={{ height: '14px', width: '80%' }}></div>
                <div className="skeleton" style={{ height: '12px', width: '40%', marginTop: '8px' }}></div>
              </div>
            </div>
          ))
        ) : (
          recentActivities.map((activity) => (
            <div key={activity.id} className={`activity-card ${activity.type}`}>
              <div className="activity-icon">
                {activity.icon}
              </div>
              <div className="activity-details">
                <div className="activity-header">
                  <span className={`activity-status status-${activity.type}`}></span>
                  <p className="activity-message">{activity.message}</p>
                </div>
                <span className="activity-timestamp">{activity.timestamp}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;