// File: src/icons/Heading3.tsx
import React from 'react';

const Heading3 = ({ size = 24, color = 'currentColor', className = '', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M4 12h8" />
    <path d="M4 18V6" />
    <path d="M12 18V6" />
    <path d="M17 14a2 2 0 1 0 0-4h-2" />
    <path d="M15 16a2 2 0 1 0 0 4h2" />
  </svg>
);

export default Heading3;