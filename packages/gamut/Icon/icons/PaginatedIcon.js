import React from 'react';

export default function PaginatedIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <title>Paginated Icon</title>
      <g transform="translate(1 8)" fill="none" fillRule="evenodd">
        <circle cx="4" cy="4" r="3.5" />
        <circle cx="16" cy="4" r="3.5" />
        <circle cx="28" cy="4" r="3.5" />
      </g>
    </svg>
  );
}
