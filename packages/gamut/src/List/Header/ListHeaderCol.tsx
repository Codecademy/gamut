import { ComponentProps, forwardRef } from 'react';

import { ColEl } from '../elements';
import { useColSize } from '../hooks';
import { useListContext } from '../ListProvider';
import { PublicListProps } from '../types';

export interface ListColProps
  extends PublicListProps<ComponentProps<typeof ColEl>> {}

export const ListCol = forwardRef<HTMLDivElement, ListColProps>(
  ({ type, size, ...rest }, ref) => {
    const { scrollable, rowBreakpoint, spacing, ...activeVariants } =
      useListContext();
    const sticky = type === 'header' && scrollable;
    const responsiveStyles = useColSize({ rowBreakpoint, size, spacing });

    return (
      <ColEl
        {...activeVariants}
        {...rest}
        {...responsiveStyles}
        ref={ref}
        size={size}
        spacing={spacing}
        sticky={sticky}
        type={type}
      />
    );
  }
);
