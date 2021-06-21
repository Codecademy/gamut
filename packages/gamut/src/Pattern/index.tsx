import { uniqueId } from 'lodash';
import React, { ComponentProps, useState } from 'react';

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
  name: PatternName;
}

export const Pattern: React.FC<PatternProps> = ({ name, ...props }) => {
  const [id] = useState(() => uniqueId(name));

  return (
    <Box {...props}>
      <Box aria-hidden as="svg" height="100%" width="100%">
        {defs(name, id)}
        <rect x="0" y="0" width="100%" height="100%" fill={`url(#${name})`} />
      </Box>
    </Box>
  );
};
