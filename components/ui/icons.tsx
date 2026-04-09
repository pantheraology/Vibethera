import React from 'react';

export const VibetheraLogo = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Geometric Panther Head */}
    <path
      d="M12 22C12 22 20 18 20 12V7L12 2L4 7V12C4 18 12 22 12 22Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 10L12 13L16 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 6V13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 16V19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const LockIcon = ({ className }: { className?: string }) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M5 4.63636C5 3.18055 6.11929 2 7.5 2C8.88071 2 10 3.18055 10 4.63636V6H5V4.63636ZM4 6V4.63636C4 2.62825 5.567 1 7.5 1C9.433 1 11 2.62825 11 4.63636V6H11.5C12.0523 6 12.5 6.44772 12.5 7V13C12.5 13.5523 12.0523 14 11.5 14H3.5C2.94772 14 2.5 13.5523 2.5 13V7C2.5 6.44772 2.94772 6 3.5 6H4ZM3.5 7V13H11.5V7H3.5Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);