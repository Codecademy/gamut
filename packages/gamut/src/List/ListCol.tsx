import { ComponentProps, forwardRef } from 'react';

import { ColEl, StickyColumnWrapper } from './elements';
import { useListContext } from './ListProvider';
import { PublicListProps } from './types';

export interface ListColProps
  extends PublicListProps<ComponentProps<typeof ColEl>> {}

export const ListCol = forwardRef<HTMLDivElement, ListColProps>(
  ({ type, ...rest }, ref) => {
    const { scrollable, ...activeVariants } = useListContext();
    const sticky = type === 'header' && scrollable;

    const col = (
      <ColEl
        {...activeVariants}
        {...rest}
        delimiter={sticky && activeVariants.variant === 'table'}
        type={type}
        sticky={sticky}
        ref={ref}
      />
    );
    if (sticky) {
      return <StickyColumnWrapper>{col}</StickyColumnWrapper>;
    }
    return <>{col}</>;
  }
);
