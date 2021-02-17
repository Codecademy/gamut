import styled from '@emotion/styled';
import React from 'react';

import { Box, BoxProps } from '../Box';
import { defs } from './defs';

export type PatternName =
  | 'diagonalStripesLoose'
  | 'diagonalStripesRegular'
  | 'diagonalStripesDense'
  | 'dotsLoose'
  | 'dotsRegular'
  | 'dotsDense';

export interface PatternProps extends BoxProps {
  name: PatternName;
}
const Svg = styled.svg`
  width: 100%;
  height: 100%;
  position: absolute; // Can I do this? Or do I need to make this passable as a prop? This does mess up the story
`;

export const Pattern: React.FC<PatternProps> = ({ name, ...props }) => (
  <Box {...props}>
    <Svg>
      {defs(name)}
      <rect x="0" y="0" width="100%" height="100%" fill={`url(#${name})`} />
    </Svg>
  </Box>
);
