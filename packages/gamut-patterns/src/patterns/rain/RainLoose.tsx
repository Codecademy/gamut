import React from 'react';

import { PatternComponent, PatternSvg } from '../../types';

export const RainLoose: React.FC<PatternComponent> = ({ ...props }) => (
  <PatternSvg width="100%" height="100%" {...props} aria-hidden>
    <pattern
      id="rainLoose"
      x="0"
      y="0"
      width="16"
      height="16"
      patternUnits="userSpaceOnUse"
    >
      <rect width="1" height="1" fill="currentColor" />
      <rect x="1" y="1" width="1" height="1" fill="currentColor" />
    </pattern>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#rainLoose)" />
  </PatternSvg>
);
