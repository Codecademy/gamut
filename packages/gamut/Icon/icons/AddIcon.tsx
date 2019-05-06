import React from 'react';

import { wrapIcon } from '../wrapIcon';

export default wrapIcon(function AddIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <title>Add Icon</title>
      <g fillRule="evenodd">
        <path d="M11 4h2v16h-2z" />
        <path d="M20 11v2H4v-2z" />
      </g>
    </svg>
  );
});
