import React from 'react';

import { PatternComponent, PatternSvg } from '../../types';

export const StripeLoose: React.FC<PatternComponent> = ({ ...props }) => (
  <PatternSvg width="100%" height="100%" {...props} aria-hidden>
    <pattern
      id="stripeLoose"
      x="0"
      y="0"
      width="16"
      height="16"
      patternUnits="userSpaceOnUse"
    >
      <rect x="1" width="1" height="1" fill="currentColor" />
      <rect width="1" height="1" fill="currentColor" />
      <rect x="2" width="1" height="1" fill="currentColor" />
      <rect x="3" width="1" height="1" fill="currentColor" />
      <rect x="1" y="8" width="1" height="1" fill="currentColor" />
      <rect y="8" width="1" height="1" fill="currentColor" />
      <rect x="2" y="8" width="1" height="1" fill="currentColor" />
      <rect x="3" y="8" width="1" height="1" fill="currentColor" />
      <rect x="5" width="1" height="1" fill="currentColor" />
      <rect x="4" width="1" height="1" fill="currentColor" />
      <rect x="6" width="1" height="1" fill="currentColor" />
      <rect x="7" width="1" height="1" fill="currentColor" />
      <rect x="5" y="8" width="1" height="1" fill="currentColor" />
      <rect x="4" y="8" width="1" height="1" fill="currentColor" />
      <rect x="6" y="8" width="1" height="1" fill="currentColor" />
      <rect x="7" y="8" width="1" height="1" fill="currentColor" />
      <rect x="9" width="1" height="1" fill="currentColor" />
      <rect x="8" width="1" height="1" fill="currentColor" />
      <rect x="10" width="1" height="1" fill="currentColor" />
      <rect x="11" width="1" height="1" fill="currentColor" />
      <rect x="9" y="8" width="1" height="1" fill="currentColor" />
      <rect x="8" y="8" width="1" height="1" fill="currentColor" />
      <rect x="10" y="8" width="1" height="1" fill="currentColor" />
      <rect x="11" y="8" width="1" height="1" fill="currentColor" />
      <rect x="13" width="1" height="1" fill="currentColor" />
      <rect x="12" width="1" height="1" fill="currentColor" />
      <rect x="14" width="1" height="1" fill="currentColor" />
      <rect x="15" width="1" height="1" fill="currentColor" />
      <rect x="13" y="8" width="1" height="1" fill="currentColor" />
      <rect x="12" y="8" width="1" height="1" fill="currentColor" />
      <rect x="14" y="8" width="1" height="1" fill="currentColor" />
      <rect x="15" y="8" width="1" height="1" fill="currentColor" />
    </pattern>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#stripeLoose)" />
  </PatternSvg>
);
