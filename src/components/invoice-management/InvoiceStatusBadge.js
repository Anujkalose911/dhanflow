import React from 'react';
import '../../Assests/CSS/InvoiceStatusBadge.css';

const InvoiceStatusBadge = ({ status }) => {
  const getStatusClass = () => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'status-approved';
      case 'pending':
        return 'status-pending';
      case 'rejected':
        return 'status-rejected';
      default:
        return 'status-unknown';
    }
  };

  return (
    <span className={`status-badge ${getStatusClass()}`}>
      {status || 'Unknown'}
    </span>
  );
};

export default InvoiceStatusBadge;