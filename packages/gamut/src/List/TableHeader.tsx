import { ComponentProps, forwardRef } from 'react';

import { Box } from '../Box';
import { HeaderEl } from './elements';
import { useListContext } from './ListProvider';
import { PublicListProps } from './types';

export interface TableHeaderProps
  extends Partial<PublicListProps<ComponentProps<typeof HeaderEl>>> {}

export const TableHeader = forwardRef<HTMLDivElement, TableHeaderProps>(
  ({ children, ...rest }, ref) => {
    const { spacing, scrollable, variant } = useListContext();
    return (
      <Box as="thead" display="block" position="sticky" top={0} zIndex={2}>
        <HeaderEl
          {...rest}
          spacing={spacing}
          variant={variant}
          scrollable={scrollable}
          ref={ref}
          as="tr"
        >
          {children}
        </HeaderEl>
      </Box>
    );
  }
);
