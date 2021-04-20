import { Box } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

import { PatternProps } from './types';

const Svg = styled.svg`
  width: 100%;
  height: 100%;
`;

export const DotLoose: React.FC<PatternProps> = ({ ...props }) => (
  <Box {...props}>
    <Svg aria-hidden>
      <pattern
        id="dotLoose"
        x="0"
        y="0"
        width="16"
        height="16"
        patternUnits="userSpaceOnUse"
      >
        <rect width="0.5" height="0.5" fill="currentColor" fillOpacity="0.5" />
        <rect
          y="1"
          width="0.5"
          height="0.5"
          fill="currentColor"
          fillOpacity="0.5"
        />
        <rect y="0.5" width="0.5" height="0.5" fill="currentColor" />
        <rect
          x="1"
          width="0.5"
          height="0.5"
          fill="currentColor"
          fillOpacity="0.5"
        />
        <rect
          x="1"
          y="1"
          width="0.5"
          height="0.5"
          fill="currentColor"
          fillOpacity="0.5"
        />
        <rect x="1" y="0.5" width="0.5" height="0.5" fill="currentColor" />
        <rect x="0.5" width="0.5" height="0.5" fill="currentColor" />
        <rect x="0.5" y="1" width="0.5" height="0.5" fill="currentColor" />
        <rect x="0.5" y="0.5" width="0.5" height="0.5" fill="currentColor" />
      </pattern>
      <rect x="0" y="0" width="100%" height="100%" fill={`url(#dotLoose)`} />
    </Svg>
  </Box>
);
