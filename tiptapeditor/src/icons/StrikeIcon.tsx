// File: src/icons/StrikeIcon.tsx
// Icon color is controlled by parent (inherits 'currentColor'). For dark mode, ensure parent sets color to white or near-white.
import React from 'react';

const StrikeIcon = ({ size = 24, color = 'currentColor', className = '', ...props }) => (
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
    <path d="M16 4H9a3 3 0 0 0-2.83 4" />
    <path d="M14 12a4 4 0 0 1 0 8H8" />
    <line x1="4" x2="20" y1="12" y2="12" />
  </svg>
);

export default StrikeIcon;