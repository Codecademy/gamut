import { DotLoose } from '@codecademy/gamut-patterns';
import { timingValues } from '@codecademy/gamut-styles';
import isArray from 'lodash/isArray';
import { forwardRef, useEffect } from 'react';
import * as React from 'react';

import { Box, BoxProps, FlexBox } from '../Box';
import { CompatibleComponentProps } from '../utils';
import {
  AnimatedListWrapper,
  hiddenVariant,
  ListEl,
  shadowVariant,
  StaticListWrapper,
} from './elements';
import { useScrollabilityCheck } from './hooks';
import { ListProvider, useList } from './ListProvider';
import { AllListProps } from './types';

export interface ListProps extends AllListProps<CompatibleComponentProps<typeof ListEl>> {
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
   * How the List container should handle overflow.
   */
  overflow?: BoxProps['overflow'];
  /**
   * This is an override for the width of the wrapper element that contains the List.
   * It is useful for custom scroll and breakpoint handling. Use with caution.
   */
  wrapperWidth?: BoxProps['width'];
  /** Whether to disable container queries on the List wrapper */
  disableContainerQuery?: boolean;
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
      overflow = 'auto',
      scrollToTopOnUpdate = false,
      wrapperWidth,
      disableContainerQuery = false,
      ...rest
    },
    ref
  ) => {
    const isEmpty = !children || (isArray(children) && children.length === 0);
    const isTable = as === 'table';

    const value = useList({
      listType: as,
      rowBreakpoint,
      scrollable,
      spacing,
      variant,
    });

    const { isEnd, tableRef, setWrapperRef, handleScroll } =
      useScrollabilityCheck({ shadow, scrollable, children, loading, isEmpty });

    const ListWrapper = shadow ? AnimatedListWrapper : StaticListWrapper;
    const showShadow = shadow && scrollable && !isEnd && !isEmpty;
    const animationVar = showShadow ? 'shadow' : 'hidden';

    useEffect(() => {
      if (scrollToTopOnUpdate && tableRef.current !== null) {
        tableRef.current.scrollTo({ top: 0 });
      }
    });

    const listContent = (
      <ListEl
        as={isTable ? 'tbody' : as}
        ref={ref}
        variant={value.variant}
        {...rest}
      >
        {children}
      </ListEl>
    );

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
          height="inherit"
          maxHeight="inherit"
          minHeight="inherit"
          minWidth="min-content"
          overflow="inherit"
          position="relative"
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
          animate={animationVar}
          disableContainerQuery={disableContainerQuery}
          id={id}
          maxHeight={height}
          overflow={overflow}
          position="relative"
          ref={setWrapperRef}
          transition={{
            background: { duration: timingValues.fast, ease: 'easeInOut' },
          }}
          variants={{
            hidden: hiddenVariant,
            shadow: shadowVariant,
          }}
          width={1}
          onScroll={scrollable ? handleScroll : undefined}
        >
          <Box
            as={isTable && !isEmpty && !loading ? 'table' : 'div'}
            data-testid={`scrollable-${id}`}
            height={isEmpty ? height : 'fit-content'}
            maxWidth={wrapperWidth || 1}
            minHeight={minHeight}
            overflow="inherit"
            position="relative"
            ref={!isEmpty ? tableRef : undefined}
            width={wrapperWidth || 'inherit'}
          >
            {content}
          </Box>
          {isEmpty && (
            <FlexBox center width={1}>
              <DotLoose inset={0} position="absolute" top={0} />
            </FlexBox>
          )}
        </ListWrapper>
      </ListProvider>
    );
  }
);
