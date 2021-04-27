import React from 'react';

import { PatternComponent, PatternSvg } from '../../types';

export const ExLoose: React.FC<PatternComponent> = ({ ...props }) => (
  <PatternSvg width="100%" height="100%" {...props} aria-hidden>
    <pattern
      id="exLoose"
      x="0"
      y="0"
      width="16"
      height="16"
      patternUnits="userSpaceOnUse"
    >
      <rect x="1" width="1" height="1" fill="currentColor" />
      <rect y="1" width="1" height="1" fill="currentColor" />
      <rect x="1" y="2" width="1" height="1" fill="currentColor" />
      <rect x="15" width="1" height="1" fill="currentColor" />
      <rect x="15" y="2" width="1" height="1" fill="currentColor" />
    </pattern>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#exLoose)" />
  </PatternSvg>
);
