import { CheckerDense } from '@codecademy/gamut-patterns';
import * as React from 'react';

import { Box } from '../../Box';
import { WithChildrenProp } from '../../utils';

/**
 * Outer wrapper for the calendar (header + body + footer).
 * Used by DatePickerCalendar to group the calendar content.
 * Renders a CheckerDense pattern shadow at offset left 8, top 8.
 */
export const CalendarWrapper: React.FC<WithChildrenProp> = ({ children }) => (
  <Box position="relative" width="max-content">
    <CheckerDense left={8} position="absolute" top={8} />
    <Box
      bg="background"
      border={1}
      borderRadius="sm"
      position="relative"
      zIndex={1}
    >
      {children}
    </Box>
  </Box>
);
