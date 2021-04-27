import React from 'react';

import { PatternProps } from '../../types';

export const dotDense: React.FC<PatternProps> = ({ ...props }) => (
  <svg width="100%" height="100%" {...props} aria-hidden>
    <pattern
      id="dotDense"
      x="0"
      y="0"
      width="4"
      height="4"
      patternUnits="userSpaceOnUse"
    >
      <circle cx="0.5" cy="0.5" r="0.5" fill="currentColor" />
    </pattern>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#dotDense)" />
  </svg>
);
