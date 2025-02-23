import React, { useState, useEffect } from 'react';
import Joyride, { STATUS } from 'react-joyride';
import InvoiceList from '../invoice-management/InvoiceList';
import InvoiceDetails from '../invoice-management/InvoiceDetails';
import NewInvoiceForm from '../invoice-management/NewInvoiceForm';
import '../../Assests/CSS/InvoiceManagement.css';
import Header2 from "../../Layouts/Headers/Header2.js";
import axiosInstance from '../../utils/axiosConfig';
import { toast } from 'react-toastify';
import { Button } from '../../components/ui/button/button';

const InvoiceManagement = () => {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [userRole, setUserRole] = useState(null);

  // Add tutorial state
  const [runTutorial, setRunTutorial] = useState(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenInvoiceTutorial');
    return !hasSeenTutorial;
  });

  const steps = [
    {
      target: '.invoice-management',
      content: 'Welcome to Invoice Management! Let me show you around.',
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '.new-invoice-button',
      content: 'Click here to create a new invoice via WhatsApp.',
    },
    {
      target: '.search-container',
      content: 'Search for invoices by vendor name, invoice number, or amount.',
    },
    {
      target: '.sort-container',
      content: 'Sort invoices by different criteria like date, amount, or status.',
    },
    {
      target: '.invoice-table',
      content: 'View all your invoices here. Click on any invoice to see more details.',
    },
    {
      target: '.status-badge',
      content: 'Different colors indicate different invoice statuses - Approved, Pending, or Rejected.',
    },
    {
      target: '.view-button',
      content: 'Click here to view detailed information about an invoice.',
    }
  ];

  useEffect(() => {
    // Get user role from localStorage
    const userData = localStorage.getItem('user_data');
    if (userData) {
      try {
        const decodedData = decodeURIComponent(userData);
        const cleanedStr = decodedData.replace(/^['"]|['"]$/g, '');
        const parsedData = JSON.parse(cleanedStr);
        setUserRole(parsedData.role?.toLowerCase());
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  // Fetch invoices on component mount
  useEffect(() => {
    fetchInvoices();
  }, [currentPage, pageSize, sortBy, sortDirection]);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/api/invoices', {
        params: {
          page: currentPage,
          pageSize,
          sortBy,
          sortDirection
        }
      });
      if (response.data.success) {
        setInvoices(response.data.data);
      } else {
        setError('Failed to fetch invoices');
      }
    } catch (error) {
      console.error('Error fetching invoices:', error);
      setError('Error loading invoices');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    // WhatsApp number with country code
    const phoneNumber = "918660993875";
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=Hi, I would like to insert a new invoice.`;
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
  };

  const handleViewInvoice = async (invoiceId) => {
    try {
      const response = await axiosInstance.get(`/api/invoices/${invoiceId}`);
      if (response.data.success) {
        setSelectedInvoice(response.data.data);
      } else {
        toast.error('Failed to fetch invoice details');
      }
    } catch (error) {
      console.error('Error fetching invoice details:', error);
      toast.error('Error loading invoice details');
    }
  };

  const handleStatusUpdate = () => {
    fetchInvoices();
  };

  const handleEditInvoice = (invoiceId) => {
    // Navigate to edit page or open edit modal
    
    toast.info('Edit functionality coming soon');
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      localStorage.setItem('hasSeenInvoiceTutorial', 'true');
    }
  };

  return (
    <section>
      <Header2 />
      <div className="invoice-management">
        <div className="header-container">
          <div>
            <h1 className="header-title">Invoice Management</h1>
            <p className="header-subtitle">Manage and track your invoices</p>
          </div>
          <div className="button-group">
            <div className="tutorial-button-wrapper">
              <button
                className="tutorial-button"
                onClick={() => setRunTutorial(true)}
              >
                Show Tutorial
              </button>
            </div>
            {userRole && userRole !== 'auditor' && (
              <Button 
                variant="default"
                onClick={handleWhatsAppRedirect}
                className="new-invoice-button"
              >
                + New Invoice
              </Button>
            )}
          </div>
        </div>
        
        <Joyride
          steps={steps}
          run={runTutorial}
          continuous={true}
          showProgress={true}
          showSkipButton={true}
          callback={handleJoyrideCallback}
          styles={{
            options: {
              primaryColor: 'rgb(13, 100, 206)',
              backgroundColor: '#ffffff',
              textColor: '#333',
              zIndex: 1000,
            },
          }}
        />

        <div className="invoice-management-content">
          {loading ? (
            <div className="loading">Loading invoices...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <InvoiceList 
              invoices={invoices}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onViewInvoice={handleViewInvoice}
              onSort={handleSort}
              sortBy={sortBy}
              sortDirection={sortDirection}
            />
          )}
        </div>

        {selectedInvoice && (
          <InvoiceDetails 
            invoice={selectedInvoice} 
            onClose={() => setSelectedInvoice(null)}
            onEdit={() => handleEditInvoice(selectedInvoice.id)}
            onStatusChange={(updatedInvoice) => {
              setInvoices(invoices.map(inv => 
                inv.id === updatedInvoice.id ? updatedInvoice : inv
              ));
              handleStatusUpdate();
            }}
          />
        )}
      </div>
    </section>
  );
};

export default InvoiceManagement;