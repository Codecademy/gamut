import { containerQueries } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { ComponentProps, forwardRef, MouseEvent, useMemo } from 'react';

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

const ResponsiveExpand = styled(motion(Box))();

const ExpandInCollapseOut: React.FC<
  WithChildrenProp & {
    as: 'td' | 'div';
    breakpoint: keyof typeof containerQueries;
  }
> = ({ as, children, breakpoint }) => {
  return (
    <ResponsiveExpand
      animate="expanded"
      as={as}
      exit="collapsed"
      gridColumn={{ _: 'span 2', [breakpoint]: 'span 12' }}
      initial="collapsed"
      overflow="hidden"
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

    const containerBreakpoint = useMemo(() => {
      return `c_${rowBreakpoint || 'xs'}` as const;
    }, [rowBreakpoint]);

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
        gridTemplateColumns={{
          _: 'minmax(0, 1fr) max-content',
          [containerBreakpoint]: gridTemplateColumns,
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
              <ExpandInCollapseOut
                as={isTable ? 'td' : 'div'}
                breakpoint={containerBreakpoint}
              >
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
