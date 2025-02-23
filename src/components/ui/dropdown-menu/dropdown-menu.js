// src/components/ui/dropdown-menu/dropdown-menu.js
import React, { useState, useRef, useEffect } from 'react';
import './dropdown-menu.css';

// Main DropdownMenu container component
export const DropdownMenu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            isOpen,
            setIsOpen
          });
        }
        return child;
      })}
    </div>
  );
};

// Trigger component that toggles the dropdown
export const DropdownMenuTrigger = ({ 
  children, 
  isOpen, 
  setIsOpen, 
  asChild 
}) => {
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  if (asChild) {
    return React.cloneElement(children, {
      onClick: handleClick,
      className: `${children.props.className || ''} dropdown-trigger`
    });
  }

  return (
    <button className="dropdown-trigger" onClick={handleClick}>
      {children}
    </button>
  );
};

// Content component that contains the dropdown items
export const DropdownMenuContent = ({ 
  children, 
  isOpen, 
  align = 'start' 
}) => {
  return (
    <div className={`dropdown-content ${align === 'end' ? 'align-end' : ''} ${isOpen ? 'show' : ''}`}>
      {children}
    </div>
  );
};

// Individual dropdown menu item
export const DropdownMenuItem = ({ 
  children, 
  onClick, 
  className = '' 
}) => {
  return (
    <div 
      className={`dropdown-item ${className}`} 
      onClick={onClick}
    >
      {children}
    </div>
  );
};


