import isArray from 'lodash/isArray';
import { ComponentProps, forwardRef, useEffect, useRef, useState } from 'react';
import * as React from 'react';

import { Box, BoxProps } from '../Box';
import { ListEl } from './elements';
import { ListProvider, useList } from './ListProvider';
import { AllListProps } from './types';

export interface ListProps extends AllListProps<ComponentProps<typeof ListEl>> {
  /** Whether a placeholder width should be set when loading */
  loading?: boolean;
  /** Should only be used internally to Gamut */
  scrollable?: boolean;
  /** Whether the component should scroll to top after its rows update. */
  scrollToTopOnUpdate?: boolean;
  /** A header node, rendered above the row content */
  header?: React.ReactNode;
  height?: BoxProps['height'];
  minHeight?: BoxProps['minHeight'];
  /** If the list should render a right-side shadow when rows are scrollable to indicate more horizontal content */
  shadow?: boolean;
  /** A custom message to override the default empty message  */
  emptyMessage?: React.ReactNode;
  /**
   * @deprecated Use overflow instead!
   * Whether the List container should have overflow hidden.
   */
  overflowHidden?: boolean;
  overflow?: BoxProps['overflow'];
}

export const List = forwardRef<HTMLUListElement, ListProps>(
  (
    {
      loading,
      id,
      variant = 'default',
      spacing = 'normal',
      rowBreakpoint = 'xs',
      scrollable = false,
      shadow = false,
      height,
      minHeight,
      children,
      header,
      emptyMessage,
      overflowHidden = false,
      overflow = 'auto',
      scrollToTopOnUpdate = false,
    },
    ref
  ) => {
    const isEmpty = !children || (isArray(children) && children.length === 0);
    const [isEnd, setIsEnd] = useState(false);
    const showShadow = shadow && scrollable && !isEnd;
    const value = useList({ variant, spacing, scrollable, rowBreakpoint });

    const topOfTable = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (scrollToTopOnUpdate && topOfTable.current !== null) {
        topOfTable.current.scrollTo({ top: 0 });
      }
    });

    const listContent = (
      <ListEl ref={ref} variant={value.variant}>
        {children}
      </ListEl>
    );

    const scrollHandler = (event: React.UIEvent<HTMLDivElement>) => {
      const { offsetWidth, scrollLeft, scrollWidth } = event.currentTarget;
      setIsEnd(offsetWidth + scrollLeft >= scrollWidth);
    };

    const listContents = (
      <>
        {header} {isEmpty ? emptyMessage : listContent}
      </>
    );

    const content =
      isEmpty || loading ? (
        <Box
          minWidth="min-content"
          width="100%"
          position="relative"
          ref={topOfTable}
        >
          {listContents}
        </Box>
      ) : (
        listContents
      );

    return (
      <ListProvider value={value}>
        <Box
          position="relative"
          overflow={overflowHidden ? 'hidden' : overflow}
          width={1}
          id={id}
        >
          <Box
            data-testid={`scrollable-${id}`}
            maxHeight={height}
            maxWidth={1}
            minHeight={minHeight}
            onScroll={scrollable ? scrollHandler : undefined}
            overflow="inherit"
            position="relative"
            ref={!isEmpty ? topOfTable : undefined}
          >
            {content}
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
