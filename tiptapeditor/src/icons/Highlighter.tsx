import React from 'react';

const Highlighter = ({ size = 24, color = 'currentColor', className = '', ...props }) => (
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
    <path d="m9 11-6 6v3h9l3-3" />
    <path d="M22 15 11 4l-3 3 11 11 3-3Z" />
  </svg>
);

export default Highlighter;