import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '../ui/button/button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card/card';
import { Input } from '../ui/input/input';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '../ui/dropdown-menu/dropdown-menu';
import { Search, MoreVertical, UserPlus, Upload, Save, Trash2, Settings } from 'lucide-react';
import '../../Assests/CSS/user-management.css';
import Header2 from "../../Layouts/Headers/Header2"
import axiosInstance from '../../utils/axiosConfig';
import { toast } from 'react-hot-toast';
import Joyride, { STATUS } from 'react-joyride';

const UserManagement = () => {
  // Initial user data
  const initialUsers = [];

  // State management
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [changedUsers, setChangedUsers] = useState({}); // Track changes before saving
  const [thresholdAmount, setThresholdAmount] = useState('');
  const [runTutorial, setRunTutorial] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [csvFile, setCsvFile] = useState(null);
  const [showThresholdModal, setShowThresholdModal] = useState(false);
  const [thresholdSettings, setThresholdSettings] = useState({
    manager: '',
    operator: ''
  });

  // Available options for dropdowns
  const roleOptions = ['Accountant', 'Manager', 'Auditor','Operator', 'Not Assigned'];
  const statusOptions = ['Active', 'InActive'];

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    // Skip admin users
    if (user.role === "Admin") return false;

    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.role ? user.role.toLowerCase().includes(searchTerm.toLowerCase()) : false);
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Handle user selection
  const handleSelectUser = (userId) => {
    setSelectedUsers(prev => {
      if (prev.includes(userId)) {
        return prev.filter(id => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  // Handle select all users
  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  // Handle role or status change
  const handleUserChange = (userId, field, value) => {
    setChangedUsers(prev => {
      const prevChanges = prev[userId] || {};
      const originalUser = users.find(u => u.id === userId);
      
      let newChanges = {
        ...prevChanges,
        [field]: value
      };

      return {
        ...prev,
        [userId]: newChanges
      };
    });
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('/api/users');
      //('API Response:', response.dataconsole.log); // Debug log
      
      if (response.data && Array.isArray(response.data)) {
        // Direct array response
        const formattedUsers = response.data.map(user => ({
          ...user,
          status: user.status || 'InActive',
          role: user.role || ''
        }));
        setUsers(formattedUsers);
      } else if (response.data && response.data.success && Array.isArray(response.data.data)) {
        // Response with success and data fields
        const formattedUsers = response.data.data.map(user => ({
          ...user,
          status: user.status || 'InActive',
          role: user.role || ''
        }));
        setUsers(formattedUsers);
      } else {
        console.error('Invalid response format:', response.data);
        toast.error('Error loading users: Invalid data format');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error(error.response?.data?.message || 'Error loading users');
    }
  };

  // Update handleSaveChanges to remove threshold_amt
  const handleSaveChanges = async () => {
    try {
      // Validate all changes before making any requests
      Object.entries(changedUsers).forEach(([userId, changes]) => {
        const originalUser = users.find(u => u.id === userId);
        const status = changes.status || originalUser.status;
        const role = changes.role || originalUser.role;

        if (status === 'Active' && !role) {
          throw new Error('Active users must have a role assigned');
        }
      });

      const updatePromises = Object.entries(changedUsers).map(async ([userId, changes]) => {
        const originalUser = users.find(u => u.id === userId);
        
        const formattedChanges = {
          role: changes.role || originalUser.role || '',
          status: changes.status || originalUser.status,
          email: originalUser.email
        };
        
        // Create audit log details
        let details = [];
        if (changes.role && changes.role !== originalUser.role) {
          details.push(`Role changed from ${originalUser.role || 'none'} to ${changes.role}`);
        }
        if (changes.status && changes.status !== originalUser.status) {
          details.push(`Status changed from ${originalUser.status} to ${changes.status}`);
        }

        // Make the update request
        await axiosInstance.put(`/api/users/${userId}`, {
          ...formattedChanges,
          auditLog: {
            action: 'UPDATE',
            details: details.join(', '),
            user_id: userId
          }
        });
      });
      
      await Promise.all(updatePromises);
      await fetchUsers(); // Refresh the list
      setChangedUsers({});
      toast.success('Changes saved successfully');
    } catch (error) {
      console.error('Error saving changes:', error);
      toast.error(error.message || 'Error saving changes'); 
    }
  };

  // Check if any changes are pending
  const hasChanges = Object.keys(changedUsers).length > 0;

  const handleActionClick = (action, userId) => {
    switch (action) {
        case 'view':
            // Handle view action
            
            break;
        case 'edit':
            // Handle edit action
            
            break;
        case 'remove':
            // Handle remove action
            setUsers(prev => prev.filter(user => user.id !== userId));
            setSelectedUsers(prev => prev.filter(id => id !== userId));
            break;
        default:
           
    }
  };

  // Modify the role dropdown rendering
  const renderRoleDropdown = (user) => {
    // Get the role directly from the user object first, then from changedUsers if it exists
    const currentRole = changedUsers[user.id]?.role || user.role || '';
    const currentStatus = changedUsers[user.id]?.status;
    const isInActive = currentStatus === 'InActive';
    
    return (
      <select
        className="cell-dropdown"
        value={currentRole}
        onChange={(e) => handleUserChange(user.id, 'role', e.target.value)}
        disabled={isInActive}
      >
        <option value="">Select a Role</option>
        {roleOptions.map(role => (
          <option key={role} value={role}>{role}</option>
        ))}
      </select>
    );
  };

  // Modify the status dropdown rendering
  const renderStatusDropdown = (user) => {
    // Get status directly from database first, then from changedUsers if it exists
    const currentStatus = changedUsers[user.id]?.status || user.status;
    
    return (
      <select
        className="cell-dropdown"
        value={currentStatus || 'InActive'} // Default to InActive if no status
        onChange={(e) => handleUserChange(user.id, 'status', e.target.value)}
      >
        <option value="Active">Active</option>
        <option value="InActive">InActive</option>
      </select>
    );
  };

  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Role',
      selector: row => row.role,
      sortable: true,
      cell: row => (
        <select
          value={changedUsers[row.id]?.role || row.role}
          onChange={(e) => handleRoleChange(row.id, e.target.value)}
          className="role-select"
        >
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Accountant">Accountant</option>
          <option value="Operator">Operator</option>
          <option value="Auditor">Auditor</option>
        </select>
      ),
    },
    {
      name: 'Threshold Amount',
      selector: row => row.threshold_amt,
      sortable: true,
      cell: row => {
        const isManager = (changedUsers[row.id]?.role || row.role) === 'Manager';
        return isManager ? (
          <input
            type="text"
            className="threshold-input"
            placeholder="Enter amount"
            value={changedUsers[row.id]?.threshold_amt ?? row.threshold_amt ?? 0}
            onChange={(e) => {
              const value = e.target.value;
              // Only allow numbers and validate the input
              if (value === '' || /^\d*$/.test(value)) {
                handleUserChange(row.id, 'threshold_amt', value === '' ? 0 : parseInt(value, 10));
              }
            }}
          />
        ) : (
          <span className="threshold-text">0</span>
        );
      },
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      cell: row => (
        <select
          value={changedUsers[row.id]?.status || row.status}
          onChange={(e) => handleStatusChange(row.id, e.target.value)}
          className="status-select"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      ),
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="action-buttons">
          <button onClick={() => handleSaveChanges(row.id)} disabled={!changedUsers[row.id]}>
            Save
          </button>
        </div>
      ),
    },
  ];

  const handleRoleChange = (userId, newRole) => {
    setChangedUsers(prev => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        role: newRole,
        threshold_amt: newRole === 'Manager' ? (prev[userId]?.threshold_amt || 0) : 0
      }
    }));
  };

  const handleStatusChange = (userId, newStatus) => {
    setChangedUsers(prev => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        status: newStatus
      }
    }));
  };

  const handleFieldChange = (userId, field, value) => {
    setChangedUsers(prevChanges => {
      const newChanges = { ...prevChanges };
      if (!newChanges[userId]) {
        newChanges[userId] = {};
      }

      // If changing role, handle threshold amount
      if (field === 'role') {
        const newRole = value.toLowerCase();
        if (newRole === 'manager' || newRole === 'operator') {
          // Keep existing threshold or set to 0
          newChanges[userId].threshold_amt = prevChanges[userId]?.threshold_amt || 
            users.find(u => u.id === userId)?.threshold_amt || '0';
        } else {
          // Reset threshold for other roles
          newChanges[userId].threshold_amt = '0';
        }
      }

      // For threshold amount, ensure it's a valid number
      if (field === 'threshold_amt') {
        // Convert empty string to '0', otherwise keep the number string
        const numValue = value === '' ? '0' : value.replace(/[^0-9]/g, '');
        newChanges[userId][field] = numValue;
      } else {
        newChanges[userId][field] = value;
      }

      return newChanges;
    });
  };

  // Tutorial steps
  const tutorialSteps = [
    {
      target: '.header-title',
      content: 'Welcome to User Management! Here you can manage all system users, their roles, and permissions.',
      disableBeacon: true,
    },
    {
      target: '.search-container',
      content: 'Search for users by their name, email, or role.',
    },
    {
      target: '.filter-group',
      content: 'Filter users by their role or status.',
    },
    {
      target: '.users-table',
      content: 'View and manage all users. You can select multiple users for bulk actions.',
    },
    {
      target: '.threshold-input',
      content: 'Set threshold amounts for Managers and Operators. Managers handle invoices above this amount, while Operators handle those below it.',
    },
    {
      target: '.button-group',
      content: 'Perform bulk actions like deleting selected users or saving changes.',
    }
  ];

  // Handle tutorial events
  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRunTutorial(false);
    }
  };

  // Add this function to handle file upload
  const handleBulkUpload = async () => {
    if (!selectedRole || !csvFile) {
      toast.error('Please select a role and upload a CSV file');
      return;
    }

    const formData = new FormData();
    formData.append('file', csvFile);
    formData.append('role', selectedRole);

    try {
      const response = await axiosInstance.post('/api/bulk-upload-users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        toast.success('Users uploaded successfully');
        setShowUploadModal(false);
        // Refresh user list
        fetchUsers();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error uploading users');
    }
  };

  // Add this component inside your UserManagement component
  const BulkUploadModal = () => {
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = React.useRef(null);

    const handleDrag = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };

    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        if (file.type === "text/csv") {
          setCsvFile(file);
        } else {
          toast.error('Please upload a CSV file');
        }
      }
    };

    const handleFileSelect = (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        if (file.type === "text/csv") {
          setCsvFile(file);
        } else {
          toast.error('Please upload a CSV file');
        }
      }
    };

    return (
      <div className={`modal ${showUploadModal ? 'show' : ''}`}>
        <div className="modal-content">
          <h2>Bulk Upload Users</h2>
          <div className="modal-body">
            <div>
              <label htmlFor="role-select" className="block text-sm font-medium text-gray-700 mb-1">
                Select Role for New Users
              </label>
              <select
                id="role-select"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="role-select"
              >
                <option value="">Choose a role</option>
                {roleOptions.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            <div
              className={`file-upload-area ${dragActive ? 'drag-active' : ''} ${csvFile ? 'has-file' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="file-input"
                style={{ display: 'none' }}
              />
              
              {csvFile ? (
                <div className="file-upload-text">
                  Selected file: {csvFile.name}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setCsvFile(null);
                    }}
                    className="remove-file"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <>
                  <div className="file-upload-text">
                    Drag and drop your CSV file here or click to browse
                  </div>
                  <div className="file-types">
                    Supported format: CSV
                  </div>
                </>
              )}
            </div>

            <div className="modal-actions">
              <button onClick={() => {
                setShowUploadModal(false);
                setSelectedRole('');
                setCsvFile(null);
              }}>
                Cancel
              </button>
              <button 
                onClick={handleBulkUpload}
                disabled={!selectedRole || !csvFile}
              >
                Upload Users
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Separate ThresholdSettingsModal component
  const ThresholdSettingsModal = ({ isOpen, onClose }) => {
    const [managerThreshold, setManagerThreshold] = useState('');
    const [operatorThreshold, setOperatorThreshold] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Only fetch once when modal opens
    useEffect(() => {
      let isMounted = true;

      const fetchThresholds = async () => {
        if (!isOpen) return;
        
        try {
          setIsLoading(true);
          const response = await axiosInstance.get('/api/threshold-settings');
          if (response.data.success && isMounted) {
            const { manager, operator } = response.data.data;
            setManagerThreshold(manager || '');
            setOperatorThreshold(operator || '');
          }
        } catch (error) {
          console.error('Error fetching thresholds:', error);
          if (isMounted) {
            toast.error('Error fetching threshold settings');
          }
        } finally {
          if (isMounted) {
            setIsLoading(false);
          }
        }
      };

      if (isOpen) {
        fetchThresholds();
      }

      return () => {
        isMounted = false;
      };
    }, [isOpen]);

    const handleSave = async () => {
      if (!managerThreshold || !operatorThreshold) {
        toast.error('Please enter both threshold values');
        return;
      }

      if (Number(managerThreshold) < Number(operatorThreshold)) {
        toast.error('Manager threshold must be greater than Operator threshold');
        return;
      }

      try {
        setIsLoading(true);
        const response = await axiosInstance.post('/api/threshold-settings', {
          manager: managerThreshold,
          operator: operatorThreshold
        });

        if (response.data.success) {
          toast.success('Threshold settings saved successfully');
          onClose();
        } else {
          toast.error(response.data.message || 'Error saving threshold settings');
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error saving threshold settings');
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className={`modal ${isOpen ? 'show' : ''}`}>
        <div className="modal-content">
          <h2>Invoice Threshold Settings</h2>
          <div className="modal-body">
            <p className="threshold-info">
              Set the invoice amount thresholds:
              <br />
              • Managers can manage invoices ABOVE their threshold amount
              <br />
              • Operators can manage invoices BELOW their threshold amount
              <br />
              Note: Manager threshold should be greater than Operator threshold
            </p>
            <div className="threshold-input-group">
              <label>
                Manager Threshold Amount (₹)
                <input
                  type="number"
                  min="0"
                  value={managerThreshold}
                  onChange={(e) => setManagerThreshold(e.target.value)}
                  className="threshold-input"
                  placeholder="Enter amount"
                  disabled={isLoading}
                />
              </label>
            </div>
            <div className="threshold-input-group">
              <label>
                Operator Threshold Amount (₹)
                <input
                  type="number"
                  min="0"
                  value={operatorThreshold}
                  onChange={(e) => setOperatorThreshold(e.target.value)}
                  className="threshold-input"
                  placeholder="Enter amount"
                  disabled={isLoading}
                />
              </label>
            </div>
          </div>
          <div className="modal-actions">
            <button 
              onClick={onClose}
              disabled={isLoading}
              className="cancel-btn"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              disabled={isLoading || !managerThreshold || !operatorThreshold}
              className="save-btn"
            >
              {isLoading ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section>
      <Header2 />
      
      {/* Add Joyride component */}
      <Joyride
        steps={tutorialSteps}
        run={runTutorial}
        continuous={true}
        showProgress={true}
        showSkipButton={true}
        callback={handleJoyrideCallback}
        styles={{
          options: {
            primaryColor: '#0077ff',
            zIndex: 1000,
          },
        }}
      />
      
      <div className="user-management-container">
        {/* Add tutorial button */}
        <button 
          className="tutorial-button"
          onClick={() => setRunTutorial(true)}
        >
          Show Tutorial
        </button>

        {/* Header section */}
        <div className="header-container">
          <h1 className="header-title">User Management</h1>
          <div className="button-group">
            <Button 
              variant="outline" 
              onClick={() => setShowThresholdModal(true)}
              className="threshold-btn"
            >
              <Settings size={16} className="mr-1" />
              Threshold Settings
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowUploadModal(true)}
              className="upload-btn"
            >
              <Upload size={16} className="mr-1" />
              Bulk Upload
            </Button>
            {hasChanges && (
              <Button onClick={handleSaveChanges} className="save-btn">
                <Save size={16} className="mr-1" />
                Save
              </Button>
            )}
          </div>
        </div>

        {/* Search and Filters section */}
        <Card className="card">
          <CardContent className="card-content">
            <div className="search-filters">
              <div className="search-container">
                <Input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              <div className="filter-group">
                <select
                  className="select-filter"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option value="all">All Roles</option>
                  {roleOptions.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
                <select
                  className="select-filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="card">
          <CardContent className="card-content">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', padding: '1rem' }}>
                      No Users Found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td data-label="Name">{user.name}</td>
                      <td data-label="Email">{user.email}</td>
                      <td data-label="Role">
                        {renderRoleDropdown(user)}
                      </td>
                      <td data-label="Status">
                        {renderStatusDropdown(user)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Add the upload modal */}
        <BulkUploadModal />

        {/* Update ThresholdSettingsModal usage */}
        <ThresholdSettingsModal 
          isOpen={showThresholdModal}
          onClose={() => setShowThresholdModal(false)}
        />
      </div>
    </section>
  );
};

export default UserManagement;