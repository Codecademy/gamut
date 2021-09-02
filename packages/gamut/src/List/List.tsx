import React, { forwardRef } from 'react';

import { ListEl } from './elements';
import { ListProvider, useList } from './ListProvider';
import { ListProps } from './types';

export const List = forwardRef<HTMLDivElement, ListProps>(
  ({ variant = 'slat', spacing = 'normal', children }, ref) => {
    const value = useList({ variant, spacing });
    return (
      <ListProvider value={value}>
        <ListEl ref={ref} variant={value.variant}>
          {children}
        </ListEl>
      </ListProvider>
    );
  }
);
