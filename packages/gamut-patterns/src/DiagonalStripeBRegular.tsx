import { Box } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

import { PatternProps } from './types';

const Svg = styled.svg`
  width: 100%;
  height: 100%;
`;

export const DiagonalStripeBRegular: React.FC<PatternProps> = ({
  ...props
}) => (
  <Box {...props}>
    <Svg aria-hidden>
      <pattern
        id="diagonalStripeBRegular"
        x="0"
        y="0"
        width="8"
        height="8"
        patternUnits="userSpaceOnUse"
      >
        <g clipPath="url(#clipDiagonalStripeBRegular)">
          <rect width="8" height="8" fill="white" />
          <rect y="7" width="1" height="1" fill="currentColor" />
          <rect x="1" y="6" width="1" height="1" fill="currentColor" />
          <rect x="2" y="5" width="1" height="1" fill="currentColor" />
          <rect x="3" y="4" width="1" height="1" fill="currentColor" />
          <rect x="4" y="3" width="1" height="1" fill="currentColor" />
          <rect x="5" y="2" width="1" height="1" fill="currentColor" />
          <rect x="6" y="1" width="1" height="1" fill="currentColor" />
          <rect x="7" width="1" height="1" fill="currentColor" />
        </g>
        <defs>
          <clipPath id="clipDiagonalStripeBRegular">
            <rect width="8" height="8" fill="white" />
          </clipPath>
        </defs>
      </pattern>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill={`url(#diagonalStripeBRegular)`}
      />
    </Svg>
  </Box>
);
