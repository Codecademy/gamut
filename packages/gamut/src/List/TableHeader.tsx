import { forwardRef } from 'react';

import { Box } from '../Box';
import { CompatibleComponentProps } from '../utils';
import { HeaderRowEl } from './elements';
import { useListContext } from './ListProvider';
import { PublicListProps } from './types';

export interface TableHeaderProps
  extends Partial<PublicListProps<CompatibleComponentProps<typeof HeaderRowEl>>> {}

export const TableHeader = forwardRef<HTMLTableRowElement, TableHeaderProps>(
  ({ children, ...rest }, ref) => {
    const { spacing, scrollable, variant } = useListContext();
    return (
      <Box as="thead" display="block" position="sticky" top={0} zIndex={2}>
        <HeaderRowEl
          {...rest}
          ref={ref}
          scrollable={scrollable}
          spacing={spacing}
          variant={variant}
        >
          {children}
        </HeaderRowEl>
      </Box>
    );
  }
);
