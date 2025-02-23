import React, { useState } from 'react';
import '../../Assests/CSS/NewInvoiceForm.css';

const NewInvoiceForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    vendor: '',
    amount: '',
    dueDate: '',
    files: []
  });
  const [dragActive, setDragActive] = useState(false);

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
    
    const files = [...e.dataTransfer.files];
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFiles = (files) => {
    const validFiles = files.filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      return validTypes.includes(file.type);
    });

    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...validFiles]
    }));
  };

  const handleFileInput = (e) => {
    const files = [...e.target.files];
    handleFiles(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const removeFile = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, index) => index !== indexToRemove)
    }));
  };

  return (
    <div className="new-invoice-overlay">
      <div className="new-invoice-modal">
        <div className="modal-header">
          <h2>Add New Invoice</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="new-invoice-form">
          <div className="form-group">
            <label htmlFor="vendor">Vendor Name</label>
            <input
              type="text"
              id="vendor"
              value={formData.vendor}
              onChange={(e) => setFormData({...formData, vendor: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              value={formData.dueDate}
              onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
              required
            />
          </div>

          <div 
            className={`file-upload-area ${dragActive ? 'drag-active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file-upload"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileInput}
              className="file-input"
            />
            <label htmlFor="file-upload" className="file-label">
              <div>
                <p>Drag and drop files here or</p>
                <button type="button" className="upload-button">Browse Files</button>
                <p className="file-types">Supported formats: PDF, JPEG, PNG</p>
              </div>
            </label>
          </div>

          {formData.files.length > 0 && (
            <div className="file-list">
              <h3>Selected Files:</h3>
              {formData.files.map((file, index) => (
                <div key={index} className="file-item">
                  <span>{file.name}</span>
                  <button 
                    type="button" 
                    onClick={() => removeFile(index)}
                    className="remove-file"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Add Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewInvoiceForm; 