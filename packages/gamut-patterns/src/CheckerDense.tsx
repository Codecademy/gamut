import { Box } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

import { PatternProps } from './types';

const Svg = styled.svg`
  width: 100%;
  height: 100%;
`;

export const CheckerDense: React.FC<PatternProps> = ({ ...props }) => (
  <Box {...props}>
    <Svg aria-hidden>
      <pattern
        id="checkerDense"
        x="0"
        y="0"
        width="4"
        height="4"
        patternUnits="userSpaceOnUse"
      >
        <rect width="1" height="1" fill="currentColor" />
        <rect x="2" y="2" width="1" height="1" fill="currentColor" />
      </pattern>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill={`url(#checkerDense)`}
      />
    </Svg>
  </Box>
);
