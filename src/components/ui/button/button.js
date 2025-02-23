// src/components/ui/button/button.js
import React from 'react';
import './button.css';

// Button component that supports different variants (default, outline, ghost)
// and accepts standard button props plus a variant prop
export const Button = ({ 
  children, 
  variant = 'default',  // default variant if none specified
  className = '',       // additional classes
  ...props             // spread remaining props (onClick, type, etc.)
}) => {
  // Combine the base button class with variant and any additional classes
  const buttonClasses = `button button-${variant} ${className}`.trim();
  
  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

