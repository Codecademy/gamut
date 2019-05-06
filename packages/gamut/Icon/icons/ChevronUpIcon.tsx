import React from 'react';

import { wrapIcon } from '../wrapIcon';

export default wrapIcon(function ChevronUpIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <title>Chevron Up Icon</title>
      <path d="M20.293 18.414L21.707 17 12 7.293 2.293 17l1.414 1.414L12 10.121z" />
    </svg>
  );
});
