import { ComponentProps, forwardRef } from 'react';

import {
  ColEl,
  StickyHeaderColWrapper,
  StickyHeaderColWrapperProps,
} from './elements';
import { useListContext } from './ListProvider';
import { PublicListProps } from './types';

export interface ListColProps
  extends PublicListProps<ComponentProps<typeof ColEl>>,
    StickyHeaderColWrapperProps {}

export const ListCol = forwardRef<HTMLDivElement, ListColProps>(
  (
    {
      type,
      columnHeader,
      'aria-sort': ariaSort,
      notFirstStickyColumn,
      firstColumn,
      lastColumn,
      ...rest
    },
    ref
  ) => {
    const { listType, scrollable, ...activeVariants } = useListContext();
    const isOl = listType === 'ol';
    const isTable = listType === 'table';
    const isHeader = type === 'header';
    const sticky = isHeader && scrollable;
    const isOrderedHeader = isOl && isHeader;

    const colEl =
      !isTable || sticky ? 'div' : isHeader || columnHeader ? 'th' : 'td';

    const col = (
      <ColEl
        {...activeVariants}
        {...rest}
        aria-sort={!sticky ? ariaSort : undefined}
        as={colEl}
        columnHeader={columnHeader}
        delimiter={sticky && activeVariants.variant === 'table'}
        firstColumn={firstColumn}
        lastColumn={lastColumn}
        ref={ref}
        sticky={sticky}
        type={isOrderedHeader ? 'orderedHeader' : type}
      />
    );

    if (sticky) {
      return (
        <StickyHeaderColWrapper
          aria-sort={isTable ? ariaSort : undefined}
          as={isTable ? 'th' : 'div'}
          data-testid="header-container"
          notFirstStickyColumn={notFirstStickyColumn}
        >
          {col}
        </StickyHeaderColWrapper>
      );
    }
    return <>{col}</>;
  }
);
