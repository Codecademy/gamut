import React, { ComponentProps, forwardRef } from 'react';

import { HeaderEl } from './elements';
import { useListContext } from './ListProvider';
import { PublicListProps } from './types';

export interface ListHeaderProps
  extends Partial<PublicListProps<ComponentProps<typeof HeaderEl>>> {}

export const ListHeader = forwardRef<HTMLDivElement, ListHeaderProps>(
  ({ children, ...rest }, ref) => {
    const { spacing, scrollable } = useListContext();
    return (
      <HeaderEl {...rest} spacing={spacing} scrollable={scrollable} ref={ref}>
        {children}
      </HeaderEl>
    );
  }
);
