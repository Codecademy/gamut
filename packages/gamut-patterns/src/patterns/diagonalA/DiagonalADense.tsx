import React from 'react';

import { PatternComponent, PatternSvg } from '../../types';

export const DiagonalADense: React.FC<PatternComponent> = ({ ...props }) => (
  <PatternSvg width="100%" height="100%" {...props} aria-hidden>
    <pattern
      id="diagonalADense"
      x="0"
      y="0"
      width="4"
      height="4"
      patternUnits="userSpaceOnUse"
    >
      <rect width="1" height="1" fill="currentColor" />
      <rect x="2" y="2" width="1" height="1" fill="currentColor" />
      <rect x="1" y="2" width="1" height="1" fill="currentColor" />
      <rect x="1" y="3" width="1" height="1" fill="currentColor" />
      <rect y="3" width="1" height="1" fill="currentColor" />
      <rect x="3" width="1" height="1" fill="currentColor" />
      <rect x="3" y="1" width="1" height="1" fill="currentColor" />
      <rect x="2" y="1" width="1" height="1" fill="currentColor" />
    </pattern>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#diagonalADense)" />
  </PatternSvg>
);
