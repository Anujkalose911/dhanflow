// src/components/ui/input/input.js
import React from 'react';
import './input.css';

// Input component with built-in styling and support for additional props
export const Input = ({ 
  className = '', 
  type = 'text',    // default to text input
  ...props 
}) => {
  return (
    <input 
      type={type}
      className={`input ${className}`}
      {...props}
    />
  );
};

// src/components/ui/input/input.css
