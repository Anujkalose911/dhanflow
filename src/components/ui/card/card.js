// src/components/ui/card/card.js
import React from 'react';
import './card.css';

// Main Card component that serves as a container
export const Card = ({ children, className = '', ...props }) => {
  return <div className={`card ${className}`} {...props}>{children}</div>;
};

// CardHeader component for the top section of the card
export const CardHeader = ({ children, className = '', ...props }) => {
  return <div className={`card-header ${className}`} {...props}>{children}</div>;
};

// CardTitle component for the card's title
export const CardTitle = ({ children, className = '', ...props }) => {
  return <h2 className={`card-title ${className}`} {...props}>{children}</h2>;
};

// CardContent component for the main content area
export const CardContent = ({ children, className = '', ...props }) => {
  return <div className={`card-content ${className}`} {...props}>{children}</div>;
};

// src/components/ui/card/card.css
