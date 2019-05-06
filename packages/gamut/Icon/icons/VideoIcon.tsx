import React from 'react';

import { wrapIcon } from '../wrapIcon';

export default wrapIcon(function VideoIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <title>Video Icon</title>
      <path d="M18 12L6 20V4z" fill="currentColor" fillRule="evenodd" />
    </svg>
  );
});
