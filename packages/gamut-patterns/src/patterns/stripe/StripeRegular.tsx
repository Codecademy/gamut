import React from 'react';

import { PatternProps } from '../../types';

export const StripeRegular: React.FC<PatternProps> = ({ ...props }) => (
  <svg width="100%" height="100%" {...props} aria-hidden>
    <pattern
      id="stripeRegular"
      x="0"
      y="0"
      width="8"
      height="8"
      patternUnits="userSpaceOnUse"
    >
      <rect x="1" width="1" height="1" fill="currentColor" />
      <rect width="1" height="1" fill="currentColor" />
      <rect x="2" width="1" height="1" fill="currentColor" />
      <rect x="3" width="1" height="1" fill="currentColor" />
      <rect x="1" y="4" width="1" height="1" fill="currentColor" />
      <rect y="4" width="1" height="1" fill="currentColor" />
      <rect x="2" y="4" width="1" height="1" fill="currentColor" />
      <rect x="3" y="4" width="1" height="1" fill="currentColor" />
      <rect x="5" width="1" height="1" fill="currentColor" />
      <rect x="4" width="1" height="1" fill="currentColor" />
      <rect x="6" width="1" height="1" fill="currentColor" />
      <rect x="7" width="1" height="1" fill="currentColor" />
      <rect x="5" y="4" width="1" height="1" fill="currentColor" />
      <rect x="4" y="4" width="1" height="1" fill="currentColor" />
      <rect x="6" y="4" width="1" height="1" fill="currentColor" />
      <rect x="7" y="4" width="1" height="1" fill="currentColor" />
    </pattern>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#stripeRegular)" />
  </svg>
);
