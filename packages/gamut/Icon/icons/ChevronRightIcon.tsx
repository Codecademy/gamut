import React from 'react';

import { wrapIcon } from '../wrapIcon';

export default wrapIcon(function ChevronRightIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <title>Chevron Right Icon</title>
      <path d="M13.94 12.06L6.645 4.769l1.415-1.414 8.707 8.707-8.707 8.707-1.415-1.414z" />
    </svg>
  );
});
