import React, { useState, useEffect, useCallback } from 'react';
import { SearchFilters } from './search-filters';
import { AuditLogTable } from './audit-log-table';
import '../../Assests/CSS/audit-logs.css';
import Header2 from "../../Layouts/Headers/Header2";
import axiosInstance from '../../utils/axiosConfig';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import Joyride, { STATUS } from 'react-joyride';

export const AuditLogPage = () => {
  const { user } = useAuth();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [flaggedLogs, setFlaggedLogs] = useState(new Set());
  const [userData, setUserData] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    action: '',
    startDate: '',
    endDate: ''
  });

  // Add tutorial state
  const [runTutorial, setRunTutorial] = useState(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenAuditLogsTutorial');
    return !hasSeenTutorial;
  });

  const steps = [
    {
      target: '.audit-logs-container',
      content: 'Welcome to Audit Logs! Let me show you around.',
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '.search-input-container',
      content: 'Search through audit logs by user, action, or details.',
    },
    {
      target: '.action-filter',
      content: 'Filter logs by specific actions like Login, Logout, or Invoice operations.',
    },
    {
      target: '.date-filter',
      content: 'Filter logs by date range to narrow down your search.',
    },
    {
      target: '.audit-table',
      content: 'View all system activities here. Each row represents an audit log entry.',
    },
    {
      target: '.info-icon',
      content: 'Click here to view detailed information about any log entry.',
    },
    {
      target: '.flag-button',
      content: 'Administrators and Auditors can flag suspicious activities for review.',
    }
  ];

  const handleJoyrideCallback = ({ status }) => {
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      localStorage.setItem('hasSeenAuditLogsTutorial', 'true');
    }
  };

  // Fetch user data from API
  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get('/check-auth');
      if (response.data.success) {
      
        setUserData(response.data.user_data);
        // Update localStorage
        localStorage.setItem('user_data', JSON.stringify(response.data.user_data));
      }
    } catch (error) {
     
    }
  };

  // Get user data from localStorage
  const getUserData = () => {
    try {
      // Debug: Log raw localStorage data
      
      
      const storedData = localStorage.getItem('user_data');
      if (!storedData) {
        
        return null;
      }

      // Try parsing as JSON first
      try {
        const parsedData = JSON.parse(storedData);
        
        return parsedData;
      } catch (e) {
        // If JSON parsing fails, try decoding URI component and then parsing
        
        const decodedData = decodeURIComponent(storedData);
        const parsedData = JSON.parse(decodedData);
       
        return parsedData;
      }
    } catch (error) {
      
      return null;
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchAuditLogs = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      let url = '/get-audit-logs';
      const queryParams = new URLSearchParams();
      
      if (params.search?.trim()) queryParams.append('search', params.search);
      if (params.action?.trim()) queryParams.append('action', params.action);
      if (params.startDate) queryParams.append('start_date', params.startDate);
      if (params.endDate) queryParams.append('end_date', params.endDate);

      const queryString = queryParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }

      const response = await axiosInstance.get(url);
      if (response.data.success) {
        // Transform logs to ensure consistent data structure
        const transformedLogs = (response.data.logs || []).map(log => ({
          ...log,
          // Ensure user data is properly set
          user_name: log.user_name || log.userName || log.user || 'Unknown User',
          // Ensure flagged status is properly set
          flagged: log.flagged === true || log.is_flagged === true,
          is_flagged: log.flagged === true || log.is_flagged === true
        }));

        setLogs(transformedLogs);
        
        // Initialize flagged logs from the transformed data
        const flagged = new Set(
          transformedLogs
            .filter(log => log.flagged || log.is_flagged)
            .map(log => log.audit_log_id || log.id)
        );
       
        setFlaggedLogs(flagged);
      }
    } catch (err) {
      
      setError('Failed to fetch audit logs. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
    fetchAuditLogs(newFilters);
  }, [fetchAuditLogs]);

  const handleSearch = useCallback((query) => {
    const newFilters = { ...filters, search: query };
    handleFilterChange(newFilters);
  }, [filters, handleFilterChange]);

  const handleFilterAction = useCallback((action) => {
    const newFilters = { ...filters, action };
    handleFilterChange(newFilters);
  }, [filters, handleFilterChange]);

  const handleFilterDate = useCallback((startDate, endDate) => {
    const newFilters = { ...filters, startDate, endDate };
    handleFilterChange(newFilters);
  }, [filters, handleFilterChange]);

  const handleClearFilters = useCallback(() => {
    const clearedFilters = {
      search: '',
      action: '',
      startDate: '',
      endDate: ''
    };
    handleFilterChange(clearedFilters);
  }, [handleFilterChange]);

  const handleFlagLog = async (logId) => {
    try {
      const currentUserData = userData || getUserData();
      const response = await axiosInstance.post('/api/audit-logs/flag', {
        log_id: logId,
        flagged_by: currentUserData?.msme_id || currentUserData?.id,
        flag_reason: 'Flagged for review by ' + currentUserData?.role
      });

      if (response.data.success) {
        // Update the flaggedLogs state
        setFlaggedLogs(prev => {
          const newFlagged = new Set(prev);
          newFlagged.add(logId);
          return newFlagged;
        });
        
        // Update the logs state to reflect the change
        setLogs(prevLogs => 
          prevLogs.map(log => {
            if ((log.audit_log_id || log.id) === logId) {
              return {
                ...log,
                flagged: true,
                is_flagged: true
              };
            }
            return log;
          })
        );

        toast.success(response.data.message || 'Log marked for review successfully');
      } else {
        throw new Error(response.data.message || 'Failed to mark log for review');
      }
    } catch (error) {
      console.error('Error marking log for review:', error);
      toast.error(error.response?.data?.message || 'Failed to mark log for review. Please try again.');
    }
  };

  // Check if user can flag logs
  const currentUserData = userData || getUserData();
  
  const canFlagLogs = currentUserData?.role === 'Admin' || currentUserData?.role === 'Auditor';
 
  if (error) {
    return (
      <section>
        <Header2 />
        <div className="audit-logs-container">
          <div className="audit-logs-content">
            <p className="error-message">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <Header2 />
      <button
        className="tutorial-button"
        onClick={() => setRunTutorial(true)}
      >
        Show Tutorial
      </button>

      <Joyride
        steps={steps}
        run={runTutorial}
        continuous
        showProgress
        showSkipButton
        callback={handleJoyrideCallback}
        styles={{
          options: {
            primaryColor: '#0077ff',
            backgroundColor: '#ffffff',
            textColor: '#333',
            zIndex: 1000,
          },
        }}
      />

      <div className="audit-logs-container">
        <div className="audit-logs-header">
          <div className="header-content">
            <h1 className="audit-logs-title">Audit Logs</h1>
            {/* <p className="audit-logs-subtitle">Track and monitor system activities</p> */}
          </div>
        </div>
        
        <div className="audit-logs-content">
          <SearchFilters
            onSearch={handleSearch}
            onFilterAction={handleFilterAction}
            onFilterDate={handleFilterDate}
            onClearFilters={handleClearFilters}
            currentFilters={filters}
          />
          
          {loading ? (
            <div className="loading-overlay">
              <p>Loading audit logs...</p>
            </div>
          ) : (
            <AuditLogTable
              logs={logs}
              onFlagLog={handleFlagLog}
              flaggedLogs={flaggedLogs}
              canFlag={canFlagLogs}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default AuditLogPage;