import React, { useState } from 'react';
import { X } from 'lucide-react';
import '../../Assests/CSS/log-detail-dialog.css';

export const LogDetailDialog = ({
  log,
  isOpen,
  onClose,
  onOverride,
}) => {
  const [comments, setComments] = useState('');

  if (!isOpen) return null;

  const handleAction = (action) => {
    onOverride(action, comments);
    setComments('');
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <div className="dialog-header">
          <div>
            <h2 className="dialog-title">Audit Log Details</h2>
            <p className="dialog-subtitle">Complete information about this action</p>
          </div>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="dialog-body">
          <div className="details-grid">
            <div className="detail-item">
              <h3>Timestamp</h3>
              <p>{log.timestamp}</p>
            </div>
            <div className="detail-item">
              <h3>User</h3>
              <p>{log.user}</p>
            </div>
            <div className="detail-item">
              <h3>Action</h3>
              <p>{log.action}</p>
            </div>
            <div className="detail-item">
              <h3>IP Address</h3>
              <p>{log.ipAddress}</p>
            </div>
            <div className="detail-item">
              <h3>Device</h3>
              <p>{log.device}</p>
            </div>
            <div className="detail-item">
              <h3>Affected Records</h3>
              <ul className="affected-records">
                {log.affectedRecords.map((record, index) => (
                  <li key={index}>{record}</li>
            
                ))}
              </ul>
            </div>
            <div className="detail-item">
              <h3>Comments</h3>
              <p>{log.comments}</p>
            </div>
          </div>
          
            </div>
          </div>
        </div>
      
  );
};