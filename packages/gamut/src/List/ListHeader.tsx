import { ComponentProps, forwardRef } from 'react';

import { Box } from '../Box';
import { HeaderEl } from './elements';
import { useListContext } from './ListProvider';
import { PublicListProps } from './types';

export interface ListHeaderProps
  extends Partial<PublicListProps<ComponentProps<typeof HeaderEl>>> {}

export const ListHeader = forwardRef<HTMLDivElement, ListHeaderProps>(
  ({ children, ...rest }, ref) => {
    const { spacing, scrollable, variant, listType } = useListContext();
    return (
      <Box as="thead" display="block">
        <HeaderEl
          {...rest}
          spacing={spacing}
          variant={variant}
          scrollable={scrollable}
          ref={ref}
          as={listType === 'table' ? 'tr' : 'div'}
        >
          {children}
        </HeaderEl>
      </Box>
    );
  }
);
