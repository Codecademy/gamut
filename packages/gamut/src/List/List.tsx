import { isArray } from 'lodash';
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
  emptyMessage?: React.ReactNode;
}

export const List = forwardRef<HTMLUListElement, ListProps>(
  (
    {
      id,
      variant = 'default',
      spacing = 'normal',
      scrollable = false,
      shadow = false,
      height,
      minHeight,
      children,
      header,
      emptyMessage,
    },
    ref
  ) => {
    const isEmpty = !children || (isArray(children) && children.length === 0);
    const showShadow = shadow && scrollable && !isEmpty;
    const value = useList({ variant, spacing, scrollable });

    const listContent = (
      <ListEl ref={ref} variant={value.variant}>
        {children}
      </ListEl>
    );

    return (
      <ListProvider value={value}>
        <Box position="relative" overflow="hidden" width={1} id={id}>
          <Box
            position="relative"
            maxWidth={1}
            minHeight={minHeight}
            maxHeight={height}
            overflow="auto"
          >
            {header}
            {isEmpty ? emptyMessage : listContent}
          </Box>
          {showShadow && (
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
