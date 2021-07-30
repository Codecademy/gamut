import React, { ComponentProps } from 'react';

import { Box } from '../Box';
import { defs } from './defs';

export type PatternName =
  | 'diagonalStripesLoose'
  | 'diagonalStripesRegular'
  | 'diagonalStripesDense'
  | 'checkerLoose'
  | 'checkerRegular'
  | 'checkerDense'
  | 'dotLoose';

export interface PatternProps extends ComponentProps<typeof Box> {
  /**
   * Unique ID suffix to add the pattern ID to remove page duplicates.
   */
  idSuffix?: string;

  name: PatternName;
}

export const Pattern: React.FC<PatternProps> = ({
  idSuffix = '',
  name,
  ...props
}) => {
  return (
    <Box {...props}>
      <Box aria-hidden as="svg" height="100%" width="100%">
        {defs(name, idSuffix)}
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill={`url(#${name}${idSuffix})`}
        />
      </Box>
    </Box>
  );
};
