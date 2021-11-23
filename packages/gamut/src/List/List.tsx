import { isArray } from 'lodash';
import React, { ComponentProps, forwardRef } from 'react';

import { Box, BoxProps } from '../Box';
import { ListEl } from './elements';
import useListShadow from './hooks/useListShadow';
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
    const { listRef, shadowActive, handleScroll } = useListShadow(shadow);
    const showShadow = shadow && scrollable && shadowActive && !isEmpty;
    const value = useList({ variant, spacing, scrollable });

    const listContent = (
      <ListEl ref={ref} variant={value.variant}>
        {children}
      </ListEl>
    );

    return (
      <ListProvider value={value}>
        <Box position="relative" overflow="hidden" width={1}>
          <Box
            position="relative"
            maxWidth={1}
            minHeight={minHeight}
            maxHeight={height}
            overflow="auto"
            ref={listRef}
            onScroll={shadow ? handleScroll : undefined}
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
