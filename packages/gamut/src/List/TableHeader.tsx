import { zIndices } from '@codecademy/gamut-styles';
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
      <Box
        as="thead"
        display="block"
        position="sticky"
        top={0}
        zIndex={zIndices.stickyHeader}
      >
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
