import { styledConfig, system } from '@codecademy/gamut-styles';
import { variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import React from 'react';

import { PatternProps } from '../../types';

const logoStyles = variance.compose(
  system.layout,
  system.positioning,
  system.space
);

const Svg = styled('svg', styledConfig)<PatternProps>(logoStyles);

export const DiagonalBLoose: React.FC<PatternProps> = ({ ...props }) => (
  <Svg width="100%" height="100%" {...props} aria-hidden>
    <pattern
      id="diagonalBLoose"
      x="0"
      y="0"
      width="16"
      height="16"
      patternUnits="userSpaceOnUse"
    >
      <rect y="15" width="1" height="1" fill="currentColor" />
      <rect x="1" y="14" width="1" height="1" fill="currentColor" />
      <rect x="2" y="13" width="1" height="1" fill="currentColor" />
      <rect x="3" y="12" width="1" height="1" fill="currentColor" />
      <rect x="4" y="11" width="1" height="1" fill="currentColor" />
      <rect x="5" y="10" width="1" height="1" fill="currentColor" />
      <rect x="6" y="9" width="1" height="1" fill="currentColor" />
      <rect x="7" y="8" width="1" height="1" fill="currentColor" />
      <rect x="8" y="7" width="1" height="1" fill="currentColor" />
      <rect x="9" y="6" width="1" height="1" fill="currentColor" />
      <rect x="10" y="5" width="1" height="1" fill="currentColor" />
      <rect x="11" y="4" width="1" height="1" fill="currentColor" />
      <rect x="12" y="3" width="1" height="1" fill="currentColor" />
      <rect x="13" y="2" width="1" height="1" fill="currentColor" />
      <rect x="14" y="1" width="1" height="1" fill="currentColor" />
      <rect x="15" width="1" height="1" fill="currentColor" />
    </pattern>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#diagonalBLoose)" />
  </Svg>
);
