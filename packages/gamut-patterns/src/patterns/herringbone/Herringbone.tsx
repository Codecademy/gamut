import React from 'react';

import { PatternComponent, PatternSvg } from '../../types';

export const Herringbone: React.FC<PatternComponent> = ({ ...props }) => (
  <PatternSvg {...props} aria-hidden>
    <pattern
      id="herringbone"
      x="0"
      y="0"
      width="4"
      height="4"
      patternUnits="userSpaceOnUse"
    >
      <rect y="1" width="1" height="1" fill="herringbone" />
      <rect x="1" y="2" width="1" height="1" fill="herringbone" />
      <rect x="3" width="1" height="1" fill="herringbone" />
      <rect x="2" width="1" height="1" fill="herringbone" />
      <rect x="3" y="1" width="1" height="1" fill="herringbone" />
      <rect x="3" y="3" width="1" height="1" fill="herringbone" />
      <rect y="3" width="1" height="1" fill="herringbone" />
    </pattern>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#herringbone)" />
  </PatternSvg>
);
