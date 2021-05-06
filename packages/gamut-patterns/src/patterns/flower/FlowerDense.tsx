import React from 'react';

import { PatternComponent, PatternSvg } from '../../types';

export const FlowerDense: React.FC<PatternComponent> = ({ ...props }) => (
  <PatternSvg {...props} aria-hidden>
    <pattern
      id="flowerDense"
      x="0"
      y="0"
      width="4"
      height="4"
      patternUnits="userSpaceOnUse"
    >
      <rect width="1" height="1" fill="currentColor" />
      <rect x="1" y="1" width="1" height="1" fill="currentColor" />
      <rect y="2" width="1" height="1" fill="currentColor" />
      <rect x="3" y="1" width="1" height="1" fill="currentColor" />
    </pattern>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#flowerDense)" />
  </PatternSvg>
);
