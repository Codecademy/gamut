import { Box } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

import { PatternProps } from './types';

const Svg = styled.svg`
  width: 100%;
  height: 100%;
`;

export const DiagonalStripeBDense: React.FC<PatternProps> = ({ ...props }) => (
  <Box {...props}>
    <Svg aria-hidden>
      <pattern
        id="diagonalStripeBDense"
        x="0"
        y="0"
        width="4"
        height="4"
        patternUnits="userSpaceOnUse"
      >
        <g clipPath="url(#clipDiagonalStripeBDense)">
          <rect width="4" height="4" fill="white" />
          <rect y="3" width="1" height="1" fill="currentColor" />
          <rect x="1" y="2" width="1" height="1" fill="currentColor" />
          <rect x="2" y="1" width="1" height="1" fill="currentColor" />
          <rect x="3" width="1" height="1" fill="currentColor" />
        </g>
        <defs>
          <clipPath id="clipDiagonalStripeBDense">
            <rect width="4" height="4" fill="white" />
          </clipPath>
        </defs>
      </pattern>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill={`url(#diagonalStripeBDense)`}
      />
    </Svg>
  </Box>
);
