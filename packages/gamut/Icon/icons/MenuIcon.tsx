import React from 'react';

import { wrapIcon } from '../wrapIcon';

export default wrapIcon(function MenuIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <g fillRule="nonzero">
        <path d="M20 11v2H4v-2zM20 17v2H4v-2zM20 5v2H4V5z" />
      </g>
    </svg>
  );
});
