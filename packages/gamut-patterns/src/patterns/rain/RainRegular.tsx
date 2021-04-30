import React from 'react';

import { PatternComponent, PatternSvg } from '../../types';

export const RainRegular: React.FC<PatternComponent> = ({ ...props }) => (
  <PatternSvg {...props} aria-hidden>
    <pattern
      id="rainRegular"
      x="0"
      y="0"
      width="8"
      height="8"
      patternUnits="userSpaceOnUse"
    >
      <rect width="1" height="1" fill="currentColor" />
      <rect x="1" y="1" width="1" height="1" fill="currentColor" />
    </pattern>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#rainRegular)" />
  </PatternSvg>
);
