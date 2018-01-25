import React from 'react';

const SpinnerIcon = props => (
  <svg viewBox="0 0 100 100" {...props}>
    <defs>
      <linearGradient id="spinner-stroke" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stopColor="#000" />
        <stop offset=".5" stopColor="#000" stopOpacity="0" />
      </linearGradient>
    </defs>
    <circle
      cx="50"
      cy="50"
      r="20"
      fill="none"
      stroke="url(#spinner-stroke)"
      strokeWidth="2"
    />
  </svg>
);

export default SpinnerIcon;
