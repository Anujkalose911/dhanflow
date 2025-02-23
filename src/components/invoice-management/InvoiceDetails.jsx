import React from 'react';
import '../../Assests/CSS/InvoiceDetails.css';
import axiosInstance from '../../utils/axiosConfig';
import { toast } from 'react-toastify';

const InvoiceDetails = ({ invoice, onClose, onEdit, onStatusChange }) => {
  const getUserRole = () => {
    try {
      const userData = localStorage.getItem('user_data');
      if (!userData) return null;
      
      const decodedStr = decodeURIComponent(userData);
      const cleanedStr = decodedStr.replace(/^"|"$/g, '');
      const parsedData = JSON.parse(cleanedStr);
      return parsedData.role.toLowerCase();
    } catch (error) {
      console.error('Error getting user role:', error);
      return null;
    }
  };

  const userRole = getUserRole();
  const canEditInvoice = userRole && userRole !== 'auditor';
  const canApproveReject = userRole && userRole !== 'auditor';

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
        toast.success('Invoice approved successfully');
        onStatusChange({
          ...invoice,
          status: 'Approved',
          approvalStatus: 'Approved'
        });
      } else {
        toast.error(response.data.message || 'Failed to approve invoice');
      }
    } catch (error) {
      console.error('Error approving invoice:', error);
      toast.error('Error approving invoice');
    }
  };

  const handleReject = async () => {
    try {
      const response = await axiosInstance.put(`/api/invoices/${invoice.id}/status`, {
        status: 'Rejected'
      });
      
      if (response.data.success) {
        toast.success('Invoice rejected successfully');
        onStatusChange({
          ...invoice,
          status: 'Rejected',
          approvalStatus: 'Rejected'
        });
      } else {
        toast.error(response.data.message || 'Failed to reject invoice');
      }
    } catch (error) {
      console.error('Error rejecting invoice:', error);
      toast.error('Error rejecting invoice');
    }
  };

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
          <p><span>Subtotal:</span> <span>{formatAmount(invoice.subtotal || invoice.amount)}</span></p>
          <p><span>Tax:</span> <span>{formatAmount(invoice.tax || 0)}</span></p>
          <p><span>Discount:</span> <span>{formatAmount(invoice.discount || 0)}</span></p>
          <p><span>Advance:</span> <span>{formatAmount(invoice.advance || 0)}</span></p>
          <p><span>TOTAL:</span> <span>{formatAmount(invoice.total || invoice.amount)}</span></p>
        </div>

        <div className="status-information">
          <h3>Status Information</h3>
          <p><span>Invoice Status:</span> <span data-status={invoice.status || 'Pending'}>{invoice.status || 'Pending'}</span></p>
          <p><span>Approval Status:</span> <span data-status={invoice.approvalStatus || invoice.status || 'Pending'}>
            {invoice.approvalStatus || invoice.status || 'Pending'}
          </span></p>
        </div>

        {(canEditInvoice || canApproveReject) && (
          <div className="invoice-actions">
            {canEditInvoice && (
              <button className="action-button edit-button" onClick={onEdit}>
                Edit Invoice
              </button>
            )}
            {canApproveReject && invoice.status !== 'Approved' && (
              <button className="action-button approve-button" onClick={handleApprove}>
                Approve
              </button>
            )}
            {canApproveReject && invoice.status !== 'Rejected' && (
              <button className="action-button reject-button" onClick={handleReject}>
                Reject
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceDetails; 