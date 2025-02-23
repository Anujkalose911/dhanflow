import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import KPICard from '../components/Dashboard/KPICard';
import Header2 from '../Layouts/Headers/Header2';
import '../Assests/CSS/Dashboard.css';

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/get-dashboard-data');
        
        if (response.data.success) {
          //console.log('Dashboard data received:', response.data.data);
          setDashboardData(response.data.data);
        } else {
          setError('Failed to fetch dashboard data');   
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Error loading dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
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
    
  };

  const handleViewAuditLogs = () => {
    
  };

  const handleDownloadReports = () => {
    
  };

  return (
    <section>
      <Header2 />
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
          {dashboardData.kpis.map((kpi, index) => (
            <KPICard
              key={index}
              title={kpi.title}
              value={kpi.value}
              icon={kpi.icon}
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

export default DashboardPage; 