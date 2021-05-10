import styled from '@emotion/styled';
import React from 'react';

import { Box, BoxProps } from '../Box';
import { defs } from './defs';

export type PatternName =
  | 'diagonalStripesLoose'
  | 'diagonalStripesRegular'
  | 'diagonalStripesDense'
  | 'checkerLoose'
  | 'checkerRegular'
  | 'checkerDense'
  | 'dotLoose';

export interface PatternProps extends BoxProps {
  name: PatternName;
}

const Svg = styled.svg`
  width: 100%;
  height: 100%;
`;

export const Pattern: React.FC<PatternProps> = ({ name, ...props }) => {
  return (
    <Box {...props}>
      <Svg aria-hidden>
        {defs(name)}
        <rect x="0" y="0" width="100%" height="100%" fill={`url(#${name})`} />
      </Svg>
    </Box>
  );
};
