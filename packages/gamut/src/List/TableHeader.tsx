import React, { ComponentProps, forwardRef, useMemo } from 'react';

import { Box } from '../Box';
import { condensedSpacing, HeaderRowEl, normalSpacing } from './elements';
import { useListContext } from './ListProvider';
import { PublicListProps } from './types';

export interface TableHeaderProps
  extends Partial<PublicListProps<ComponentProps<typeof HeaderRowEl>>> {}

export const TableHeader = forwardRef<HTMLTableRowElement, TableHeaderProps>(
  ({ children, ...rest }, ref) => {
    const { spacing, scrollable, variant, rowBreakpoint } = useListContext();
    const breakpoint = useMemo(() => rowBreakpoint ?? 'xs', [rowBreakpoint]);
    const gap = React.useMemo(() => {
      const breakpoint = rowBreakpoint ?? 'xs';
      return spacing === 'condensed'
        ? condensedSpacing(breakpoint)
        : spacing === 'normal'
        ? normalSpacing(breakpoint)
        : {};
    }, [rowBreakpoint, spacing]);
    return (
      <Box as="thead" display="block" position="sticky" top={0} zIndex={2}>
        <HeaderRowEl
          {...rest}
          as="tr"
          flexDirection={{ _: 'column', [breakpoint]: 'row' }}
          position={{ _: 'initial', [breakpoint]: 'sticky' }}
          {...gap}
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
