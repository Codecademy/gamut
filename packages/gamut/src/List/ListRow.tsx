import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { ComponentProps, forwardRef, MouseEvent } from 'react';
import * as React from 'react';

import { Box } from '../Box';
import { WithChildrenProp } from '../utils';
import { RowEl } from './elements';
import { useListContext } from './ListProvider';
import { PublicListProps } from './types';
import { getGridTemplateColumns } from './utils';

export interface RowProps
  extends Partial<PublicListProps<ComponentProps<typeof RowEl>>> {
  header?: boolean;
  /** This is an internal prop that is largely only used for the DataTable component */
  numOfColumns?: number;
  /**  This is an internal prop that is largely only used for the DataTable component */
  selectable?: boolean;
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

const expandStyles = css({
  overflow: 'hidden',
  gridColumn: { _: 'span 2', c_sm: 'span 12' },
});

const DivExpand = styled(motion.div)(expandStyles);
const TDExpand = styled(motion.td)(expandStyles);

const ExpandInCollapseOut: React.FC<
  WithChildrenProp & { as: 'td' | 'div' }
> = ({ as, children }) => {
  const ResponsiveExpand = as === 'td' ? TDExpand : DivExpand;

  return (
    <ResponsiveExpand
      animate="expanded"
      exit="collapsed"
      initial="collapsed"
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      variants={{
        expanded: { height: 'auto' },
        collapsed: { height: 0 },
      }}
    >
      {children}
    </ResponsiveExpand>
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
      numOfColumns,
      selectable,
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

    const gridTemplateColumns =
      isTable && renderExpanded
        ? getGridTemplateColumns({ numOfColumns, selectable })
        : 'minmax(0, 1fr) max-content';

    if ((renderExpanded || Boolean(onClick)) && !isTable) {
      content = (
        <RowEl
          as="div"
          {...rowConfig}
          aria-expanded={renderExpanded && onClick ? expanded : undefined}
          clickable={Boolean(onClick)}
          isOl={isOl}
          role={onClick ? 'button' : role}
          tabIndex={onClick ? 0 : tabIndex}
          onClick={onClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && onClick) {
              onClick(e as unknown as MouseEvent<HTMLLIElement>);
            }
          }}
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
        expanded={isTable ? undefined : !!renderExpanded}
        gridAutoRows={{ _: undefined, c_sm: 'minmax(1.5rem, max-content) 6fr' }}
        gridTemplateColumns={{
          _: 'minmax(0, 1fr) max-content',
          c_sm: gridTemplateColumns,
        }}
        isOl={renderNumbering}
        role={role}
        rowBreakpoint={isTable && renderExpanded ? 'grid' : rowBreakpoint}
        scrollable={scrollable}
        tabIndex={tabIndex}
        variant={variant}
        {...wrapperProps}
      >
        <>
          {content}
          <AnimatePresence>
            {expanded && (
              <ExpandInCollapseOut as={isTable ? 'td' : 'div'}>
                <Box aria-label={expandedRowAriaLabel} role="region">
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
