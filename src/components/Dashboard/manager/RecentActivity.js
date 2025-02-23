import React, { useState, useEffect } from 'react';

function RecentActivity() {
  const initialActivities = [
    { message: "Invoice #789 needs immediate approval", time: "5 mins ago", type: "high-priority" },
    { message: "Invoice #456 was approved", time: "10 mins ago", type: "approval" },
    { message: "Issue raised for Invoice #123", time: "30 mins ago", type: "issue" },
    { message: "Invoice #234 is overdue for approval", time: "1 hr ago", type: "overdue" },
  ];

  const [activities, setActivities] = useState(initialActivities);

  const possibleActivities = [
    { message: "New high-priority invoice received", type: "high-priority" },
    { message: "Invoice approved by Manager", type: "approval" },
    { message: "Issue reported in processing", type: "issue" },
    { message: "Invoice pending approval", type: "pending" },
    { message: "Invoice rejected due to discrepancy", type: "rejection" }
  ];

  const getRandomTime = () => {
    const times = ["Just now", "2 mins ago", "5 mins ago", "10 mins ago"];
    return times[Math.floor(Math.random() * times.length)];
  };

  const addNewActivity = () => {
    const randomActivity = possibleActivities[Math.floor(Math.random() * possibleActivities.length)];
    const newActivity = { ...randomActivity, time: getRandomTime() };
    setActivities(prev => [newActivity, ...prev].slice(0, 5));
  };

  useEffect(() => {
    const interval = setInterval(addNewActivity, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="recent-activity">
      <div className="activity-header">
        <h2>Recent Activity</h2>
        <button onClick={addNewActivity} className="refresh-btn">
          🔄 Refresh
        </button>
      </div>
      <div className="activity-list">
        {activities.map((activity, index) => (
          <div key={index} className={`activity-item ${activity.type}`}>
            <span className="activity-message">{activity.message}</span>
            <span className="activity-time">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;