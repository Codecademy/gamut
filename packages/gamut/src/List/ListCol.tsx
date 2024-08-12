import { ComponentProps, forwardRef } from 'react';

import { ColEl, StickyColumnWrapper } from './elements';
import { useListContext } from './ListProvider';
import { PublicListProps } from './types';

export interface ListColProps
  extends PublicListProps<ComponentProps<typeof ColEl>> {}

export const ListCol = forwardRef<HTMLDivElement, ListColProps>(
  ({ type, ...rest }, ref) => {
    const { isOl, scrollable, ...activeVariants } = useListContext();
    const sticky = type === 'header' && scrollable;
    const isOrderedHeader = isOl && type === 'header';

    const col = (
      <ColEl
        {...activeVariants}
        {...rest}
        delimiter={sticky && activeVariants.variant === 'table'}
        type={isOrderedHeader ? 'orderedHeader' : type}
        sticky={sticky}
        ref={ref}
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
