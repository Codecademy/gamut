import React, { ComponentProps, forwardRef } from 'react';

import { Box, BoxProps } from '../Box';
import { ListEl } from './elements';
import { ListProvider, useList } from './ListProvider';
import { AllListProps } from './types';

export interface ListProps extends AllListProps<ComponentProps<typeof ListEl>> {
  scrollable?: boolean;
  header?: React.ReactNode;
  height?: BoxProps['height'];
  minHeight?: BoxProps['minHeight'];
  shadow?: boolean;
}

export const List = forwardRef<HTMLUListElement, ListProps>(
  (
    {
      variant = 'slat',
      spacing = 'normal',
      scrollable = false,
      shadow = false,
      height,
      minHeight,
      children,
      header,
    },
    ref
  ) => {
    const value = useList({ variant, spacing, scrollable });
    return (
      <ListProvider value={value}>
        <Box position="relative" overflow="auto">
          <Box
            position="relative"
            maxWidth={1}
            maxHeight={height}
            minHeight={minHeight}
            overflow="auto"
          >
            {header}
            <ListEl ref={ref} variant={value.variant}>
              {children}
            </ListEl>
          </Box>
          {shadow && (
            <Box
              position="absolute"
              right={-10}
              top={0}
              bottom={0}
              width={10}
              boxShadow="0 0 48px black, 0 0 24px black"
            />
          )}
        </Box>
      </ListProvider>
    );
  }
);
