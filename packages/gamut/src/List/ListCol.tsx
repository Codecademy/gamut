import { ComponentProps, forwardRef } from 'react';

import { ColEl, StickyHeaderColWrapper } from './elements';
import { useColSize } from './hooks';
import { useListContext } from './ListProvider';
import { PublicListProps } from './types';

export interface ListColProps
  extends PublicListProps<ComponentProps<typeof ColEl>> {}

export const ListCol = forwardRef<HTMLDivElement, ListColProps>(
  ({ size, type, ...rest }, ref) => {
    const { listType, scrollable, rowBreakpoint, spacing, ...activeVariants } =
      useListContext();

    const responsiveStyles = useColSize({ rowBreakpoint, size, spacing });
    const isOl = listType === 'ol';
    const isTable = listType === 'table';
    const isHeader = type === 'header';
    const sticky = isHeader && scrollable;
    const isOrderedHeader = isOl && isHeader;
    const colEl =
      isTable && !sticky && isHeader ? 'th' : !isTable || sticky ? 'div' : 'td';

    const col = (
      <ColEl
        {...activeVariants}
        {...rest}
        {...responsiveStyles}
        as={colEl}
        delimiter={sticky && activeVariants.variant === 'table'}
        ref={ref}
        size={size}
        spacing={spacing}
        sticky={sticky}
        type={isOrderedHeader ? 'orderedHeader' : type}
      />
    );
    if (sticky) {
      return (
        <StickyHeaderColWrapper
          as={isTable ? 'th' : 'div'}
          data-testid="header-container"
        >
          {col}
        </StickyHeaderColWrapper>
      );
    }
    return <>{col}</>;
  }
);
