import React from 'react';

const KPICard = ({ title, value, icon, type }) => {
  return (
    <div className="kpi-card">
      <div className={`kpi-icon ${type}`}>
        {icon}
      </div>
      <div className="kpi-content">
        <h3>{title}</h3>
        <p className="kpi-value">{value}</p>
      </div>
    </div>
  );
};

export default KPICard; 