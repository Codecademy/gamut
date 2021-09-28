import { motion } from 'framer-motion';
import React, { ComponentProps, forwardRef } from 'react';

import { RowEl } from './elements';
import { useListContext } from './ListProvider';
import { PublicListProps } from './types';

export interface RowProps
  extends Partial<PublicListProps<ComponentProps<typeof RowEl>>> {
  header?: boolean;
}

export interface ExpandableRowProps extends RowProps {
  expanded: boolean;
  renderExpanded: React.ReactNode;
}

export interface SimpleRowProps extends RowProps {
  expanded?: never;
  renderExpanded?: never;
}

export type ListRowProps = ExpandableRowProps | SimpleRowProps;

export const ListRow = forwardRef<HTMLLIElement, ListRowProps>(
  ({ children, expanded, renderExpanded, ...rest }, ref) => {
    const { variant, scrollable, ...rowConfig } = useListContext();
    return (
      <RowEl variant={variant} expanded scrollable={scrollable}>
        <RowEl as="div" {...rowConfig} {...rest} ref={ref}>
          {children}
        </RowEl>
        <motion.div
          initial={expanded ? 'expanded' : 'collapsed'}
          animate={expanded ? 'expanded' : 'collapsed'}
          style={{ overflow: 'hidden' }}
          variants={{
            expanded: { height: 'auto' },
            collapsed: { height: 0 },
          }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          <RowEl as="div" {...rowConfig} {...rest} role="region">
            {renderExpanded}
          </RowEl>
        </motion.div>
      </RowEl>
    );
  }
);
