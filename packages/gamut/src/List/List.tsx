import { DotLoose } from '@codecademy/gamut-patterns';
import isArray from 'lodash/isArray';
import { ComponentProps, forwardRef, useEffect, useRef, useState } from 'react';
import * as React from 'react';

import { Box, BoxProps, FlexBox } from '../Box';
import { ListEl, ListWrapper } from './elements';
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

    const wrapperRef = useRef<HTMLDivElement>(null);
    const tableRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const wrapperWidth =
        wrapperRef?.current?.getBoundingClientRect()?.width ?? 0;
      const tableWidth = tableRef?.current?.getBoundingClientRect().width ?? 0;

      setIsEnd(tableWidth < wrapperWidth);
    }, []);

    const isTable = as === 'table';
    useEffect(() => {
      if (scrollToTopOnUpdate && tableRef.current !== null) {
        tableRef.current.scrollTo({ top: 0 });
      }
    });

    const listContent = (
      <ListEl as={isTable ? 'tbody' : as} ref={ref} variant={value.variant}>
        {children}
      </ListEl>
    );

    const scrollHandler = (event: React.UIEvent<HTMLDivElement>) => {
      const { offsetWidth, scrollLeft, scrollWidth } = event.currentTarget;
      setIsEnd(offsetWidth + Math.ceil(scrollLeft) >= scrollWidth);
    };

    const listContents = (
      <>
        {header}
        {isEmpty ? emptyMessage : listContent}
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
          ref={tableRef}
          width="100%"
        >
          {listContents}
        </Box>
      ) : (
        listContents
      );

    return (
      <ListProvider value={value}>
        <ListWrapper
          id={id}
          onScroll={scrollable ? scrollHandler : undefined}
          overflow={overflowHidden ? 'hidden' : overflow}
          position="relative"
          ref={wrapperRef}
          scrollable={!isEmpty && showShadow}
          width={1}
          maxHeight={height}
        >
          <Box
            as={isTable && !isEmpty && !loading ? 'table' : 'div'}
            data-testid={`scrollable-${id}`}
            height={isEmpty ? height : 'fit-content'}
            maxWidth={1}
            minHeight={minHeight}
            overflow="inherit"
            position="relative"
            ref={!isEmpty ? tableRef : undefined}
          >
            {content}
          </Box>

          {isEmpty && (
            <FlexBox center width={1}>
              <DotLoose position="absolute" inset={0} top={-2} />
            </FlexBox>
          )}
        </ListWrapper>
      </ListProvider>
    );
  }
);
