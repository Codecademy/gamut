import React from 'react';

import { PatternComponent, PatternSvg } from '../../types';

export const GridLoose: React.FC<PatternComponent> = ({ ...props }) => (
  <PatternSvg width="100%" height="100%" {...props} aria-hidden>
    <pattern
      id="gridLoose"
      x="0"
      y="0"
      width="16"
      height="16"
      patternUnits="userSpaceOnUse"
    >
      <rect width="1" height="1" fill="currentColor" />
      <rect y="8" width="1" height="1" fill="currentColor" />
      <rect x="8" width="1" height="1" fill="currentColor" />
      <rect x="8" y="8" width="1" height="1" fill="currentColor" />
    </pattern>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#gridLoose)" />
  </PatternSvg>
);
