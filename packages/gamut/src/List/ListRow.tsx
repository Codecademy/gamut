import { AnimatePresence, motion } from 'framer-motion';
import React, { ComponentProps, forwardRef } from 'react';

import { Box } from '..';
import { RowEl } from './elements';
import { useListContext } from './ListProvider';
import { PublicListProps } from './types';

export interface RowProps
  extends Partial<PublicListProps<ComponentProps<typeof RowEl>>> {
  header?: boolean;
}

export interface ExpandableRowProps extends RowProps {
  expanded: boolean;
  renderExpanded: () => React.ReactNode;
}

export interface SimpleRowProps extends RowProps {
  expanded?: never;
  renderExpanded?: never;
}

export type ListRowProps = ExpandableRowProps | SimpleRowProps;

const ExpandInCollapseOut: React.FC = ({ children }) => {
  return (
    <motion.div
      initial="collapsed"
      exit="collapsed"
      animate="expanded"
      style={{ overflow: 'hidden' }}
      variants={{
        expanded: { height: 'auto' },
        collapsed: { height: 0 },
      }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
};

export const ListRow = forwardRef<HTMLLIElement, ListRowProps>(
  ({ children, expanded, renderExpanded, ...rest }, ref) => {
    const { variant, scrollable, ...rowConfig } = useListContext();
    const wrapperProps = !renderExpanded ? rowConfig : {};
    let content = children;

    if (renderExpanded) {
      content = (
        <RowEl as="div" {...rowConfig} {...rest} ref={ref}>
          {children}
        </RowEl>
      );
    }

    return (
      <RowEl
        variant={variant}
        expanded={!!renderExpanded}
        scrollable={scrollable}
        {...wrapperProps}
      >
        {content}
        <AnimatePresence>
          {expanded && (
            <ExpandInCollapseOut>
              <Box role="region">{renderExpanded?.()}</Box>
            </ExpandInCollapseOut>
          )}
        </AnimatePresence>
      </RowEl>
    );
  }
);
