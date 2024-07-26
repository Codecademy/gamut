import { AnimatePresence, motion } from 'framer-motion';
import { ComponentProps, forwardRef } from 'react';
import * as React from 'react';

import { Box, WithChildrenProp } from '..';
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
  keepSpacingWhileExpanded?: boolean;
}

export interface SimpleRowProps extends RowProps {
  expanded?: never;
  renderExpanded?: never;
  expandedRowAriaLabel?: never;
  keepSpacingWhileExpanded?: never;
}

export type ListRowProps = ExpandableRowProps | SimpleRowProps;

const ExpandInCollapseOut: React.FC<WithChildrenProp> = ({ children }) => {
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
  (
    {
      children,
      expanded,
      expandedRowAriaLabel,
      renderExpanded,
      keepSpacingWhileExpanded,
      ...rest
    },
    ref
  ) => {
    const {
      isOl,
      rowBreakpoint,
      scrollable,
      variant,
      ...rowConfig
    } = useListContext();
    const wrapperProps = !renderExpanded
      ? rowConfig
      : { spacing: keepSpacingWhileExpanded ? rowConfig.spacing : undefined };
    let content = children;
    const renderNumbering = isOl && renderExpanded === undefined;

    if (renderExpanded) {
      content = (
        <RowEl
          as="div"
          {...rowConfig}
          aria-expanded={rest?.onClick ? expanded : undefined}
          clickable={!!rest?.onClick}
          isOl={isOl}
          onClick={rest?.onClick}
          role={rest?.onClick ? 'button' : rest?.role}
          tabIndex={rest?.onClick ? 0 : rest?.tabIndex}
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
        rowBreakpoint={rowBreakpoint}
        isOl={renderNumbering}
        {...wrapperProps}
      >
        <>
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
        </>
      </RowEl>
    );
  }
);
