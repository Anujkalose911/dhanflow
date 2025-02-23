// import React from 'react';
// import { Info } from 'lucide-react';
// import '../../Assests/CSS/audit-log-table.css';

// export const AuditLogTable = ({ logs, onViewDetails }) => {
//   return (
//     <div className="table-container">
//       <table className="audit-table">
//         <thead>
//           <tr>
//             <th>Timestamp</th>
//             <th>User Name</th>
//             <th>Action</th>
//             <th>Details</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {logs.map((log) => (
//             <tr key={log.audit_log_id}>
//               <td>{log.timestamp}</td>
//               <td>{log.user_name}</td>
//               <td>{log.action}</td>
//               <td>{log.details}</td>
//               <td>
//                 <Info 
//                   size={20} 
//                   className="info-icon"
//                   onClick={() => onViewDetails(log)}
//                   style={{ cursor: 'pointer' }}
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
import React from 'react';
import { FaFlag } from 'react-icons/fa';
import '../../Assests/CSS/audit-logs.css';

export const AuditLogTable = ({ logs, onFlagLog, flaggedLogs, canFlag }) => {
  // Add touch event handling for mobile
  const handleTouchFlag = (e, logId) => {
    e.preventDefault();
    onFlagLog(logId);
  };

  return (
    <div className="audit-table-container">
      <table className="audit-table">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>User</th>
            <th>Action</th>
            <th>Details</th>
            {canFlag && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => {
            const logId = log.audit_log_id || log.id;
            const isFlagged = flaggedLogs?.has(logId) || log.flagged === true || log.is_flagged === true;
            
            return (
              <tr key={logId} className={isFlagged ? 'flagged' : ''}>
                <td data-label="Timestamp">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td data-label="User">
                  {log.user_name}
                </td>
                <td data-label="Action">
                  {log.action}
                </td>
                <td data-label="Details">
                  {log.details}
                </td>
                {canFlag && (
                  <td data-label="Actions">
                    <div className="action-buttons">
                      <button
                        className={`flag-button ${isFlagged ? 'flagged' : ''}`}
                        onClick={() => onFlagLog(logId)}
                        onTouchStart={(e) => handleTouchFlag(e, logId)}
                        title={isFlagged ? "Already marked for review" : "Mark for review"}
                        disabled={isFlagged}
                        aria-label={isFlagged ? "Log marked for review" : "Mark log for review"}
                      >
                        <FaFlag className={`flag-icon ${isFlagged ? 'flagged' : ''}`} />
                        <span className="button-text">
                          {isFlagged ? 'Marked for Review' : 'Mark for Review'}
                        </span>
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AuditLogTable;