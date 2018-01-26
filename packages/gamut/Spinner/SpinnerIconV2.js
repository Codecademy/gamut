import React from 'react';

const SpinnerIcon = props => (
  <svg viewBox="0 0 100 100" {...props}>
    <defs>
      <linearGradient id="spinner-stroke" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="currentColor" stopOpacity="0" />
        <stop offset="1" stopColor="currentColor" />
      </linearGradient>
      <linearGradient id="circle-stroke">
        <stop offset="0.7" stopColor="currentColor" stopOpacity="0" />
        <stop offset="1" stopColor="currentColor" />
      </linearGradient>
    </defs>
    <g fill="none">
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="url(#circle-stroke)"
        opacity=".3"
        strokeWidth="2"
        transform="rotate(-45 50 50)"
      />
      <path
        d="M50 10 a 40 40 0 0 1 40 40"
        stroke="url(#spinner-stroke)"
        strokeWidth="10"
        strokeLinecap="round"
      />
    </g>
  </svg>
);

export default SpinnerIcon;

// <circle
//   cx="50"
//   cy="50"
//   r="20"
//   fill="green"
//   stroke="url(#spinner-stroke)"
//   strokeWidth="5"
// />
