import { CheckerDense } from '@codecademy/gamut-patterns';
import { zIndexes } from '@codecademy/gamut-styles';
import * as React from 'react';

import { Box } from '../../../Box';
import { WithChildrenProp } from '../../../utils';

export const CalendarWrapper: React.FC<WithChildrenProp> = ({ children }) => (
  <Box position="relative" width="max-content">
    <CheckerDense left={8} position="absolute" top={8} />
    <Box
      bg="background"
      border={1}
      borderRadius="sm"
      position="relative"
      zIndex={zIndexes.foreground}
    >
      {children}
    </Box>
  </Box>
);
