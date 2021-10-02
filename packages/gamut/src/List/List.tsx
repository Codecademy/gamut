import React, { ComponentProps, forwardRef } from 'react';

import { Box, BoxProps } from '../Box';
import { ListEl } from './elements';
import { ListProvider, useList } from './ListProvider';
import { AllListProps } from './types';

export interface ListProps extends AllListProps<ComponentProps<typeof ListEl>> {
  scrollable?: boolean;
  header?: React.ReactNode;
  height?: BoxProps['height'];
}

export const List = forwardRef<HTMLUListElement, ListProps>(
  (
    {
      variant = 'slat',
      spacing = 'normal',
      scrollable = false,
      height,
      children,
      header,
    },
    ref
  ) => {
    const value = useList({ variant, spacing, scrollable });
    return (
      <ListProvider value={value}>
        <Box
          position="relative"
          maxWidth={1}
          maxHeight={height}
          overflow="auto"
        >
          {header}
          <ListEl ref={ref} variant={value.variant}>
            {children}
          </ListEl>
        </Box>
      </ListProvider>
    );
  }
);
