import React, { ComponentProps, forwardRef } from 'react';

import { RowEl } from './elements';
import { useListContext } from './ListProvider';
import { PublicListProps } from './types';

export interface ListRowProps
  extends PublicListProps<ComponentProps<typeof RowEl>> {}

export const ListRow = forwardRef<HTMLDivElement, ListRowProps>(
  ({ children, ...rest }, ref) => {
    const activeVariants = useListContext();
    return (
      <RowEl {...activeVariants} {...rest} ref={ref}>
        {children}
      </RowEl>
    );
  }
);
