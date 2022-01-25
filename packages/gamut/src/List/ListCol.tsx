import React, { ComponentProps, forwardRef } from 'react';

import { ColEl } from './elements';
import { useListContext } from './ListProvider';
import { PublicListProps } from './types';

export interface ListColProps
  extends PublicListProps<ComponentProps<typeof ColEl>> {}

export const ListCol = forwardRef<HTMLDivElement, ListColProps>(
  ({ type, ...rest }, ref) => {
    const { scrollable, ...activeVariants } = useListContext();
    const sticky = type === 'header' && scrollable;

    return (
      <ColEl
        {...activeVariants}
        {...rest}
        delimiter={sticky && activeVariants.variant === 'table'}
        type={type}
        sticky={sticky}
        ref={ref}
        overflow="visible"
      />
    );
  }
);
