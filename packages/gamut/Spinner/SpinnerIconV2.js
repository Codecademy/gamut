import React from 'react';

const SpinnerIcon = props => (
  <svg viewBox="-1 -1 100 100" {...props}>
    <path d="M0 0 h 10 v 10 h -10 Z" fill="none" stroke="black" />
    <path d="M10 10 h 30 v 30 h -30 Z" fill="none" stroke="black" />
    <path d="M40 40 h 50 v 50 h -50 Z" fill="none" stroke="black" />
  </svg>
);

export default SpinnerIcon;

// <defs>
//   <linearGradient id="spinner-stroke" x1="0" y1="0" x2="1" y2="1">
//     <stop offset="0" stopColor="currentColor" />
//     <stop offset="0.8" stopColor="currentColor" stopOpacity="0.1" />
//   </linearGradient>
// </defs>
// <circle
//   cx="50"
//   cy="50"
//   r="20"
//   fill="green"
//   stroke="url(#spinner-stroke)"
//   strokeWidth="5"
// />
