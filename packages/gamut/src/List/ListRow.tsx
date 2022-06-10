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
  expandedRowAriaLabel?: string;
}

export interface SimpleRowProps extends RowProps {
  expanded?: never;
  renderExpanded?: never;
  expandedRowAriaLabel?: never;
}

export type ListRowProps = ExpandableRowProps | SimpleRowProps;

const ExpandInCollapseOut: React.FC = ({ children }) => {
  return (
    <motion.div
      initial="collapsed"
      exit="collapsed"
      animate="expanded"
      variants={{
        expanded: {
          height: 'auto',
          overflow: 'hidden',
          transitionEnd: { overflow: 'visible' },
        },
        collapsed: {
          height: 0,
          overflow: 'hidden',
          transitionEnd: { overflow: 'visible' },
        },
      }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
};

export const ListRow = forwardRef<HTMLLIElement, ListRowProps>(
  (
    { children, expanded, expandedRowAriaLabel, renderExpanded, ...rest },
    ref
  ) => {
    const { variant, scrollable, ...rowConfig } = useListContext();
    const wrapperProps = !renderExpanded ? rowConfig : {};
    let content = children;

    if (renderExpanded) {
      content = (
        <RowEl
          as="div"
          {...rowConfig}
          aria-expanded={expanded}
          clickable={!!rest?.onClick}
          role={rest?.onClick ? 'button' : rest?.role}
          tabIndex={rest?.onClick ? 0 : rest?.tabIndex}
          onClick={rest?.onClick}
          {...rest}
          ref={ref}
        >
          {children}
        </RowEl>
      );
    }

    return (
      <RowEl
        variant={variant}
        expanded={!!renderExpanded}
        scrollable={scrollable}
        onClick={rest?.onClick}
        {...wrapperProps}
      >
        {content}
        <AnimatePresence>
          {expanded && (
            <ExpandInCollapseOut>
              <Box role="region" aria-label={expandedRowAriaLabel}>
                {renderExpanded?.()}
              </Box>
            </ExpandInCollapseOut>
          )}
        </AnimatePresence>
      </RowEl>
    );
  }
);
