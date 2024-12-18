import { AnimatePresence, motion } from 'framer-motion';
import { ComponentProps, forwardRef, MouseEvent } from 'react';
import * as React from 'react';

import { Box } from '../Box';
import { WithChildrenProp } from '../utils';
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
    const { listType, rowBreakpoint, scrollable, variant, ...rowConfig } =
      useListContext();
    const isOl = listType === 'ol';
    const isTable = listType === 'table';
    const { onClick, role, tabIndex, ...rowProps } = rest;
    const wrapperProps =
      (!renderExpanded && !onClick) || isTable
        ? { ...rowConfig, ...rowProps }
        : { spacing: keepSpacingWhileExpanded ? rowConfig.spacing : undefined };
    let content = children;
    const renderNumbering = isOl && renderExpanded === undefined && !onClick;

    // This works on DataGrid + DataTable, minus the expanded rows in DataTable. Need to look into renderExpanded.
    const newProps = { ...rowConfig, ...rowProps };

    // do we need render expanded here? this should only be for clickable rows
    if ((renderExpanded || Boolean(onClick)) && !isTable) {
      content = (
        <RowEl
          as="div"
          {...rowConfig}
          aria-expanded={renderExpanded && onClick ? expanded : undefined}
          clickable={Boolean(onClick)}
          isOl={isOl}
          onClick={onClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && onClick) {
              onClick(e as unknown as MouseEvent<HTMLLIElement>);
            }
          }}
          role={onClick ? 'button' : role}
          tabIndex={onClick ? 0 : tabIndex}
          {...rowProps}
          ref={ref}
        >
          {children}
        </RowEl>
      );
    }

    return (
      <RowEl
        aria-live={renderExpanded ? 'polite' : undefined}
        variant={variant}
        expanded={isTable ? undefined : !!renderExpanded}
        scrollable={scrollable}
        rowBreakpoint={rowBreakpoint}
        isOl={renderNumbering}
        role={role}
        tabIndex={tabIndex}
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
