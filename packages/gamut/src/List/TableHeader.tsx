import { ComponentProps, forwardRef } from 'react';

import { Box } from '../Box';
import { HeaderRowEl } from './elements';
import { useResponsiveSpacing } from './hooks';
import { useListContext } from './ListProvider';
import { PublicListProps } from './types';

export interface TableHeaderProps
  extends Partial<PublicListProps<ComponentProps<typeof HeaderRowEl>>> {}

export const TableHeader = forwardRef<HTMLTableRowElement, TableHeaderProps>(
  ({ children, ...rest }, ref) => {
    const { scrollable, rowBreakpoint, variant, spacing } = useListContext();
    const responsiveSpacing = useResponsiveSpacing(rowBreakpoint, spacing);

    return (
      <Box as="thead" display="block" position="sticky" top={0} zIndex={2}>
        <HeaderRowEl
          {...rest}
          ref={ref}
          rowBreakpoint={rowBreakpoint}
          scrollable={scrollable}
          spacing={responsiveSpacing}
          variant={variant}
        >
          {children}
        </HeaderRowEl>
      </Box>
    );
  }
);
