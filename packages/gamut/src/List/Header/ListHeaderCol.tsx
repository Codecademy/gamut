import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { ComponentProps, forwardRef } from 'react';

import { ColEl } from '../elements';
import { useListContext } from '../ListProvider';
import { PublicListProps } from '../types';

export interface ListColProps
  extends PublicListProps<ComponentProps<typeof ColEl>> {}

const ListColComponent = forwardRef<HTMLDivElement, ListColProps>(
  ({ type, ...rest }, ref) => {
    const { scrollable, ...activeVariants } = useListContext();
    const sticky = type === 'header' && scrollable;

    return (
      <ColEl
        {...activeVariants}
        {...rest}
        ref={ref}
        sticky={sticky}
        type={type}
      />
    );
  }
);

export const ListCol = ListColComponent as unknown as ForwardRefExoticComponent<
  ListColProps & RefAttributes<HTMLDivElement>
>;
