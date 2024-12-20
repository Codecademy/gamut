import { DotLoose } from '@codecademy/gamut-patterns';
import isArray from 'lodash/isArray';
import { ComponentProps, forwardRef, useEffect, useRef, useState } from 'react';
import * as React from 'react';

import { Box, BoxProps, FlexBox } from '../Box';
import { ListEl } from './elements';
import { ListProvider, useList } from './ListProvider';
import { AllListProps } from './types';

export interface ListProps extends AllListProps<ComponentProps<typeof ListEl>> {
  /** Whether List should be an ol, ul element, or table */
  as?: 'ol' | 'ul' | 'table';
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
  maxHeight?: BoxProps['maxHeight'];
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
      as = 'ul',
      loading,
      id,
      variant = 'default',
      spacing = 'normal',
      rowBreakpoint = 'xs',
      scrollable = false,
      shadow = false,
      height,
      minHeight,
      maxHeight,
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
    const value = useList({
      listType: as,
      rowBreakpoint,
      scrollable,
      spacing,
      variant,
    });

    const topOfTable = useRef<HTMLDivElement>(null);
    const isTable = as === 'table';
    useEffect(() => {
      if (scrollToTopOnUpdate && topOfTable.current !== null) {
        topOfTable.current.scrollTo({ top: 0 });
      }
    });

    const listContent = (
      <ListEl as={isTable ? 'tbody' : as} ref={ref} variant={value.variant}>
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
          as="table"
          maxHeight="inherit"
          height="inherit"
          minHeight="inherit"
          minWidth="min-content"
          position="relative"
          overflow="inherit"
          ref={topOfTable}
          width="100%"
        >
          {listContents}
        </Box>
      ) : (
        listContents
      );

    return (
      <ListProvider value={value}>
        <Box
          id={id}
          maxHeight={maxHeight}
          height={height}
          minHeight={minHeight}
          overflow={overflowHidden ? 'hidden' : overflow}
          position="relative"
          width={1}
        >
          <Box
            as={isTable && !isEmpty && !loading ? 'table' : 'div'}
            data-testid={`scrollable-${id}`}
            maxHeight="inherit"
            maxWidth={1}
            minHeight="inherit"
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
          {isEmpty && (
            <FlexBox center width={1}>
              <DotLoose position="absolute" inset={0} top={-2} />
            </FlexBox>
          )}
        </Box>
      </ListProvider>
    );
  }
);
