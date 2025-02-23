// src/components/InvoiceList/InvoiceList.js
import React, { useState } from 'react';
import InvoiceStatusBadge from '../invoice-management/InvoiceStatusBadge';
import '../../Assests/CSS/InvoiceList.css';

const InvoiceList = ({ invoices, searchTerm, setSearchTerm, onViewInvoice }) => {
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState('desc');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSortDirectionClick = (direction) => {
    setSortDirection(direction);
  };

  const getSortLabel = () => {
    if (!sortBy) {
      return 'Sort by...';
    }

    switch (sortBy) {
      case 'id':
        return 'Invoice ID';
      case 'vendor':
        return 'Vendor Name';
      case 'amount':
        return 'Amount';
      case 'status':
        return 'Status';
      case 'date':
        return 'Due Date';
      default:
        return 'Sort by...';
    }
  };

  const getSortedInvoices = () => {
    // First filter the invoices based on search term
    const filteredInvoices = invoices.filter(invoice =>
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.vendor.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Then sort the filtered invoices
    return [...filteredInvoices].sort((a, b) => {
      switch (sortBy) {
        case 'id':
          const idA = parseInt(a.id.split('-')[1]);
          const idB = parseInt(b.id.split('-')[1]);
          return sortDirection === 'asc' 
            ? idA - idB 
            : idB - idA;

        case 'vendor':
          return sortDirection === 'asc'
            ? a.vendor.localeCompare(b.vendor)
            : b.vendor.localeCompare(a.vendor);

        case 'amount':
          return sortDirection === 'asc' 
            ? a.amount - b.amount 
            : b.amount - a.amount;
        
        case 'status':
          const statusA = a.status || 'Z';
          const statusB = b.status || 'Z';
          return sortDirection === 'asc'
            ? statusA.localeCompare(statusB)
            : statusB.localeCompare(statusA);

        case 'date':
          const dateA = new Date(a.dueDate);
          const dateB = new Date(b.dueDate);
          return sortDirection === 'asc' 
            ? dateA - dateB 
            : dateB - dateA;
        
        default:
          return 0;
      }
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: '2-digit'
    });
  };

  const formatAmount = (amount) => {
    return amount.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const getPaginatedInvoices = () => {
    const sortedInvoices = getSortedInvoices();
    // If pageSize is -1, return all invoices
    if (pageSize === -1) return sortedInvoices;
    const startIndex = (currentPage - 1) * pageSize;
    return sortedInvoices.slice(startIndex, startIndex + pageSize);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const renderMobileTable = () => (
    <div className="table-container">
      <table className="invoice-table">
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Vendor</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>View Invoice</th>
          </tr>
        </thead>
        <tbody>
          {getPaginatedInvoices().map((invoice) => (
            <tr key={invoice.id}>
              <td>
                <div className="mobile-invoice-id">{invoice.id}</div>
              </td>
              <td>
                <div className="mobile-vendor">{invoice.vendor}</div>
              </td>
              <td>
                <div className="mobile-amount">₹{formatAmount(invoice.amount)}</div>
              </td>
              <td>
                <div className="status-badge-container">
                  <InvoiceStatusBadge status={invoice.approvalStatus || 'Pending'} />
                </div>
              </td>
              <td>
                <div className="mobile-date">
                  {formatDate(invoice.dueDate)}
                </div>
              </td>
              <td>
                <div className="view-button-container">
                  <button
                    className="view-button"
                    onClick={() => onViewInvoice(invoice.id)}
                  >
                    View
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Calculate total pages
  const totalInvoices = getSortedInvoices().length;
  const totalPages = Math.ceil(totalInvoices / pageSize);

  // Navigation functions
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Add this after the table in the render
  const renderPagination = () => (
    <div className="pagination-controls">
      <div className="pagination-info">
        Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, totalInvoices)} of {totalInvoices} entries
      </div>
      <div className="pagination-buttons">
        <button 
          onClick={handlePrevPage} 
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span className="pagination-current">{currentPage}</span>
        <button 
          onClick={handleNextPage} 
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );

  return (
    <div className="invoice-list-container">
      <div className="invoice-list-controls">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="controls-right">
          <div className="page-size-selector">
            <span className="page-size-select-label">Show entries:</span>
            <select 
              value={pageSize} 
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              className="page-size-select"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={75}>75</option>
              <option value={100}>100</option>
              <option value={-1}>All</option>
            </select>
          </div>

          <div className="sort-container">
            <div className="sort-button">
              <div 
                className={`sort-criteria ${sortBy ? 'selected' : ''}`}
                onClick={() => setShowSortMenu(!showSortMenu)}
              >
                {getSortLabel()}
              </div>
              <div className="sort-direction">
                <span 
                  className={`sort-arrow ${sortDirection === 'asc' ? 'active' : ''}`}
                  onClick={() => handleSortDirectionClick('asc')}
                >
                  ↑
                </span>
                <span 
                  className={`sort-arrow ${sortDirection === 'desc' ? 'active' : ''}`}
                  onClick={() => handleSortDirectionClick('desc')}
                >
                  ↓
                </span>
              </div>
            </div>
            
            {showSortMenu && (
              <div className="sort-menu">
                <button 
                  className={`sort-option ${sortBy === 'id' ? 'active' : ''}`}
                  onClick={() => {
                    setSortBy('id');
                    setShowSortMenu(false);
                  }}
                >
                  Invoice ID
                </button>
                <button 
                  className={`sort-option ${sortBy === 'vendor' ? 'active' : ''}`}
                  onClick={() => {
                    setSortBy('vendor');
                    setShowSortMenu(false);
                  }}
                >
                  Vendor 
                </button>
                <button 
                  className={`sort-option ${sortBy === 'amount' ? 'active' : ''}`}
                  onClick={() => {
                    setSortBy('amount');
                    setShowSortMenu(false);
                  }}
                >
                  Amount
                </button>
                <button 
                  className={`sort-option ${sortBy === 'status' ? 'active' : ''}`}
                  onClick={() => {
                    setSortBy('status');
                    setShowSortMenu(false);
                  }}
                >
                  Status
                </button>
                <button 
                  className={`sort-option ${sortBy === 'date' ? 'active' : ''}`}
                  onClick={() => {
                    setSortBy('date');
                    setShowSortMenu(false);
                  }}
                >
                  Due Date
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="invoice-list">
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Vendor</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {getPaginatedInvoices().map((invoice) => (
              <tr key={invoice.id}>
                <td data-label="Invoice ID">{invoice.id}</td>
                <td data-label="Vendor">{invoice.vendor}</td>
                <td data-label="Amount">₹{formatAmount(invoice.amount)}</td>
                <td data-label="Status">
                  <div className="status-badge-container">
                    <InvoiceStatusBadge status={invoice.approvalStatus || 'Pending'} />
                  </div>
                </td>
                <td data-label="Due Date">{formatDate(invoice.dueDate)}</td>
                <td data-label="Actions">
                  <div className="action-buttons">
                    <button
                      className="action-button"
                      onClick={() => onViewInvoice(invoice.id)}
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {renderPagination()}
    </div>
  );
};

export default InvoiceList;