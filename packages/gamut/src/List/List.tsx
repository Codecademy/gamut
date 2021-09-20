import React, { ComponentProps, forwardRef } from 'react';

import { Box } from '../Box';
import { ListEl } from './elements';
import { ListProvider, useList } from './ListProvider';
import { AllListProps } from './types';

export interface ListProps extends AllListProps<ComponentProps<typeof ListEl>> {
  scrollable?: boolean;
  header?: React.ReactNode;
}

export const List = forwardRef<HTMLUListElement, ListProps>(
  (
    {
      variant = 'slat',
      spacing = 'normal',
      scrollable = false,
      children,
      header,
    },
    ref
  ) => {
    const value = useList({ variant, spacing, scrollable });
    return (
      <ListProvider value={value}>
        {header}
        <Box position="relative">
          <ListEl ref={ref} variant={value.variant}>
            {children}
          </ListEl>
        </Box>
      </ListProvider>
    );
  }
);
