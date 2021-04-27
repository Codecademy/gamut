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

export const Herringbone: React.FC<PatternProps> = ({ ...props }) => (
  <Svg width="100%" height="100%" {...props} aria-hidden>
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
  </Svg>
);
