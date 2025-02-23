import React from 'react';

function KPICard({ value, label, trend, subtitle, icon: Icon, iconColor }) {
  const getTrendColor = (trendValue) => {
    if (trendValue.includes('+')) return '#2ecc71';
    if (trendValue.includes('-')) return '#e74c3c';
    return '#7f8c8d';
  };

  return (
    <div className="kpi-card">
      {Icon && (
        <div className="kpi-icon-wrapper">
          <Icon size={24} color={iconColor} strokeWidth={1.5} />
        </div>
      )}
      <div className="kpi-content">
        <div className="kpi-header">
          <span 
            className="kpi-trend"
            style={{ 
              backgroundColor: `${getTrendColor(trend)}15`,
              color: getTrendColor(trend)
            }}
          >
            {trend}
          </span>
        </div>
        <div className="kpi-value">{value}</div>
        <div className="kpi-label-group">
          <h3 className="kpi-label">{label}</h3>
          <p className="kpi-subtitle">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
export default KPICard;
