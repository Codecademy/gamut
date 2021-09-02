import React, { forwardRef } from 'react';

import { RowEl } from './elements';
import { useListContext } from './ListProvider';
import { ListRowProps } from './types';

export const ListRow = forwardRef<HTMLDivElement, ListRowProps>(
  (props, ref) => {
    const activeVariants = useListContext();
    return <RowEl {...activeVariants} {...props} ref={ref} />;
  }
);
