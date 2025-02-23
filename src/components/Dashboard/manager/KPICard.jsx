import React from 'react';
import '../../../Assests/CSS/Dashboard.css';

const KPICard = ({ title, value, icon, type }) => {
  return (
    <div className={`kpi-card ${type}`}>
      <div className="kpi-header">
        <div className="kpi-icon">
          {icon}
        </div>
        <div className="kpi-content">
          <h3>{title}</h3>
          <div className="kpi-value">{value}</div>
        </div>
      </div>
    </div>
  );
};

export default KPICard;
