import React from 'react';

import { PatternProps } from '../../types';

export const DotRegular: React.FC<PatternProps> = ({ ...props }) => (
  <svg width="100%" height="100%" {...props} aria-hidden>
    <pattern
      id="dotRegular"
      x="0"
      y="0"
      width="8"
      height="8"
      patternUnits="userSpaceOnUse"
    >
      <circle cx="0.5" cy="0.5" r="0.5" fill="currentColor" />
    </pattern>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#dotRegular)" />
  </svg>
);
