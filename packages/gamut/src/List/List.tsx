import React, { ComponentProps, forwardRef } from 'react';

import { Box } from '../Box';
import { ListEl } from './elements';
import { ListProvider, useList } from './ListProvider';
import { AllListProps } from './types';

export interface ListProps
  extends AllListProps<ComponentProps<typeof ListEl>> {}

export const List = forwardRef<HTMLDivElement, ListProps>(
  (
    { variant = 'slat', spacing = 'normal', scrollable = false, children },
    ref
  ) => {
    const value = useList({ variant, spacing, scrollable });
    return (
      <ListProvider value={value}>
        <Box position="relative">
          <ListEl
            ref={ref}
            variant={value.variant}
            scrollable={value.scrollable}
          >
            {children}
          </ListEl>
        </Box>
      </ListProvider>
    );
  }
);
