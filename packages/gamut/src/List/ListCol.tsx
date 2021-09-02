import React, { forwardRef } from 'react';

import { ColEl } from './elements';
import { useListContext } from './ListProvider';
import { ListColProps } from './types';

export const ListCol = forwardRef<HTMLDivElement, ListColProps>(
  (props, ref) => {
    const activeVariants = useListContext();
    return <ColEl {...activeVariants} {...props} ref={ref} />;
  }
);
