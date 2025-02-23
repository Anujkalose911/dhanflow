import React from 'react';
import { X } from 'lucide-react'; // Importing an example icon
import './dialog.css';

export const Dialog = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <button className="dialog-close" onClick={onClose}>
          <X size={20} /> {/* Example icon */}
        </button>
        {children}
      </div>
    </div>
  );
};

export const DialogHeader = ({ children }) => (
    <div className="dialog-header">{children}</div>
  );
  
  export const DialogTitle = ({ children }) => (
    <h2 className="dialog-title">{children}</h2>
  );
  
  export const DialogDescription = ({ children }) => (
    <p className="dialog-description">{children}</p>
  );
  
  export const DialogFooter = ({ children }) => (
    <div className="dialog-footer">{children}</div>
  );
  
  export const DialogContent = ({ children }) => (
    <div className="dialog-content-body">{children}</div>
  );