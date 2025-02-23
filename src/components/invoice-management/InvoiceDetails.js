import React from 'react';
import '../../Assests/CSS/InvoiceDetails.css';
import axiosInstance from '../../utils/axiosConfig';
import { toast } from 'react-toastify';

const InvoiceDetails = ({ invoice, onClose, onEdit, onStatusChange }) => {
  const getUserRole = () => {
    try {
      const userData = localStorage.getItem('user_data');
      
      if (!userData) return null;
      
      // Remove outer quotes and decode the string
      let cleanedStr = userData.replace(/^"|"$/g, '');
      cleanedStr = cleanedStr.replace(/^'|'$/g, '');
      cleanedStr = cleanedStr.replace(/\\"/g, '"'); // Replace escaped quotes
      
      
      const parsedData = JSON.parse(cleanedStr);
      
      
      return parsedData.role?.toLowerCase() || null;
    } catch (error) {
      console.error('Error getting user role:', error);
      return null;
    }
  };

  const userRole = getUserRole();
  
  const isAdmin = userRole === 'admin';
  const isAccountant = userRole === 'accountant';
  const canEditInvoice = isAdmin || isAccountant;
  const canApproveReject = isAdmin || userRole === 'manager' || userRole === 'operator';

  const formatAmount = (amount) => {
    if (amount === undefined || amount === null) return '₹0.00';
    return `₹${parseFloat(amount).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const handleApprove = async () => {
    try {
      const response = await axiosInstance.put(`/api/invoices/${invoice.id}/status`, {
        status: 'Approved'
      });
      
      if (response.data.success) {
        toast.success('Invoice approved successfully', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        onStatusChange && onStatusChange({
          ...invoice,
          status: 'Approved',
          approvalStatus: 'Approved'
        });
        setTimeout(() => onClose(), 500);
      } else {
        toast.error(response.data.message || 'Failed to approve invoice', {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Error approving invoice:', error);
      toast.error('Error approving invoice', {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handleReject = async () => {
    try {
      const response = await axiosInstance.put(`/api/invoices/${invoice.id}/status`, {
        status: 'Rejected'
      });
      
      if (response.data.success) {
        toast.success('Invoice rejected successfully', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        onStatusChange && onStatusChange({
          ...invoice,
          status: 'Rejected',
          approvalStatus: 'Rejected'
        });
        setTimeout(() => onClose(), 500);
      } else {
        toast.error(response.data.message || 'Failed to reject invoice', {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Error rejecting invoice:', error);
      toast.error('Error rejecting invoice', {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const shouldShowEdit = () => {
    if (isAdmin) return true; // Admin can always edit
    if (isAccountant) {
      // Check both approvalStatus and status fields
      const approvalStatus = (invoice.approvalStatus || '').toLowerCase();
      
      const status = (invoice.status || '').toLowerCase();
      // Show edit button if either status is 'approved'
      return approvalStatus === 'approved' || status === 'approved';
    }
    return false;
  };


  const shouldShowApproveReject = () => {
    // Admin can always see approve/reject buttons
    if (isAdmin) return true;

    // For manager and operator, check if status is pending
    const approvalStatus = (invoice.approvalStatus || invoice.status || '').toLowerCase();
    return approvalStatus === 'pending' || approvalStatus === '';
  };
  
 ;

  return (
    <div className="invoice-details-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="invoice-details">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Invoice Details</h2>
        
        <div className="basic-information">
          <h3>Basic Information</h3>
          <p><span>Invoice No:</span> <span>{invoice.invoiceNo || invoice.id}</span></p>
          <p><span>Vendor:</span> <span>{invoice.vendor}</span></p>
          <p><span>Invoice Date:</span> <span>{formatDate(invoice.invoiceDate)}</span></p>
          <p><span>Due Date:</span> <span>{formatDate(invoice.dueDate)}</span></p>
        </div>

        <div className="amount-details">
          <h3>Amount Details</h3>
          <p><span>Subtotal:</span> <span>{formatAmount(invoice.subtotal)}</span></p>
          <p><span>Tax:</span> <span>{formatAmount(invoice.tax)}</span></p>
          <p><span>Discount:</span> <span>{formatAmount(invoice.discount)}</span></p>
          <p><span>Advance:</span> <span>{formatAmount(invoice.advance)}</span></p>
          <p><span>TOTAL:</span> <span>{formatAmount(invoice.amount)}</span></p>
        </div>

        <div className="status-information">
          <h3>Status Information</h3>
          <p>
            <span>Invoice Status:</span> 
            <span data-status={invoice.status || 'Pending'}>
              {invoice.status || 'Pending'}
            </span>
          </p>
          <p>
            <span>Approval Status:</span> 
            <span data-status={invoice.approvalStatus || invoice.status || 'Pending'}>
              {invoice.approvalStatus || invoice.status || 'Pending'}
            </span>
          </p>
        </div>

        <div className="invoice-actions">
          {canEditInvoice && shouldShowEdit() && (
            <button className="action-button edit-button" onClick={onEdit}>
              Edit Invoice
            </button>
          )}
          {canApproveReject && shouldShowApproveReject() && (
            <>
              <button className="action-button approve-button" onClick={handleApprove}>
                Approve
              </button>
              <button className="action-button reject-button" onClick={handleReject}>
                Reject
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;