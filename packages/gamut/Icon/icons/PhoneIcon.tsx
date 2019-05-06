import React from 'react';

import { wrapIcon } from '../wrapIcon';

export default wrapIcon(function PhoneIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <title>Phone Icon</title>
      <g fillRule="evenodd">
        <path
          fill="currentColor"
          d="M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 3v14h8V5H8z"
        />
        <path fill="transparent" d="M8 5h8v14H8z" />
      </g>
    </svg>
  );
});
