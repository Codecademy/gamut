import React from 'react';

import { PatternComponent, PatternSvg } from '../../types';

export const CheckerRegular: React.FC<PatternComponent> = ({ ...props }) => (
  <PatternSvg width="100%" height="100%" {...props} aria-hidden>
    <pattern
      id="checkerRegular"
      x="0"
      y="0"
      width="8"
      height="8"
      patternUnits="userSpaceOnUse"
    >
      <rect width="1" height="1" fill="currentColor" />
      <rect x="4" y="4" width="1" height="1" fill="currentColor" />
    </pattern>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#checkerRegular)" />
  </PatternSvg>
);
