import { ComponentProps, forwardRef } from 'react';

import { Box } from '../Box';
import { HeaderRowEl } from './elements';
import { useListContext } from './ListProvider';
import { PublicListProps } from './types';

export interface TableHeaderProps
  extends Partial<PublicListProps<ComponentProps<typeof HeaderRowEl>>> {}

export const TableHeader = forwardRef<HTMLTableRowElement, TableHeaderProps>(
  ({ children, ...rest }, ref) => {
    const { spacing, scrollable, variant } = useListContext();
    return (
      <Box as="thead" display="block" position="sticky" top={0} zIndex={2}>
        <HeaderRowEl
          {...rest}
          spacing={spacing}
          variant={variant}
          scrollable={scrollable}
          ref={ref}
        >
          {children}
        </HeaderRowEl>
      </Box>
    );
  }
);
