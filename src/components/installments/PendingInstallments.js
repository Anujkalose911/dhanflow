import React, { useState } from 'react';
import Header2 from "../../Layouts/Headers/Header2";
import './PendingInstallments.css';

const PendingInstallments = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const installments = [
    {
      id: 'INST001',
      vendor: 'Dorne Spices Ltd',
      invoice: 'DORNE/2024/001',
      selectedDate: '01 Mar 24',
      dueDate: '01 Mar 24',
      amount: '₹26,500.00'
    },
    {
      id: 'INST003',
      vendor: 'Kings Landing Supplies',
      invoice: 'KL/2024/045',
      selectedDate: '05 Mar 24',
      dueDate: '05 Mar 24',
      amount: '₹38,250.00'
    },
    {
      id: 'INST005',
      vendor: 'Iron Bank Trading',
      invoice: 'IB/2024/112',
      selectedDate: '10 Mar 24',
      dueDate: '10 Mar 24',
      amount: '₹50,000.00'
    },
    {
      id: 'INST002',
      vendor: 'Dorne Spices Ltd',
      invoice: 'DORNE/2024/001',
      selectedDate: '01 Apr 24',
      dueDate: '01 Mar 24',
      amount: '₹26,500.00'
    },
    {
      id: 'INST004',
      vendor: 'Kings Landing Supplies',
      invoice: 'KL/2024/045',
      selectedDate: '05 Apr 24',
      dueDate: '05 Mar 24',
      amount: '₹38,250.00'
    },
    {
      id: 'INST006',
      vendor: 'Iron Bank Trading',
      invoice: 'IB/2024/112',
      selectedDate: '10 Apr 24',
      dueDate: '10 Mar 24',
      amount: '₹50,000.00'
    }
  ];

  const filteredInstallments = installments.filter(installment =>
    installment.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    installment.invoice.toLowerCase().includes(searchTerm.toLowerCase()) ||
    installment.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh' }}>
      <Header2 />
      <div className="pending-installments-container">
        <div className="pending-installments-header">
          <h1 className="pending-installments-title">Pending Installments</h1>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by Vendor Name"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="installments-table-container">
          <table className="installments-table">
            <thead>
              <tr>
                <th>Installment ID</th>
                <th>Vendor Name</th>
                <th>Invoice Number</th>
                <th>Selected Date</th>
                <th>Due Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredInstallments.map((installment) => (
                <tr key={installment.id}>
                  <td>{installment.id}</td>
                  <td>{installment.vendor}</td>
                  <td>{installment.invoice}</td>
                  <td>{installment.selectedDate}</td>
                  <td>{installment.dueDate}</td>
                  <td className="amount">{installment.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PendingInstallments; 