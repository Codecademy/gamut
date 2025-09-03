import { ComponentProps, forwardRef } from 'react';

import { ColEl, StickyHeaderColWrapper } from './elements';
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
        as={colEl}
        delimiter={sticky && activeVariants.variant === 'table'}
        lastChildPadding={!(type === 'expandControl')}
        ref={ref}
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
