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

type positionProps = 'static' | 'relative' | 'absolute' | 'sticky' | 'fixed';

type SvgProps = { position: positionProps };

export interface PatternProps extends BoxProps {
  name: PatternName;
  svgPosition?: positionProps;
}

const Svg = styled.svg<SvgProps>`
  width: 100%;
  height: 100%;
  position: ${({ position }) => position};
`;

export const Pattern: React.FC<PatternProps> = ({
  name,
  svgPosition = 'static',
  ...props
}) => {
  return (
    <Box {...props}>
      <Svg position={svgPosition}>
        {defs(name)}
        <rect x="0" y="0" width="100%" height="100%" fill={`url(#${name})`} />
      </Svg>
    </Box>
  );
};
