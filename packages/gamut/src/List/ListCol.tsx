import { ComponentProps, forwardRef } from 'react';

import { ColEl, StickyColumnWrapper } from './elements';
import { useListContext } from './ListProvider';
import { PublicListProps } from './types';

export interface ListColProps
  extends PublicListProps<ComponentProps<typeof ColEl>> {}

export const ListCol = forwardRef<HTMLDivElement, ListColProps>(
  ({ type, ...rest }, ref) => {
    const { listType, scrollable, ...activeVariants } = useListContext();
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
        delimiter={sticky && activeVariants.variant === 'table'}
        type={isOrderedHeader ? 'orderedHeader' : type}
        sticky={sticky}
        ref={ref}
        as={colEl}
      />
    );
    if (sticky) {
      return (
        <StickyColumnWrapper data-testid="header-container">
          {col}
        </StickyColumnWrapper>
      );
    }
    return <>{col}</>;
  }
);
