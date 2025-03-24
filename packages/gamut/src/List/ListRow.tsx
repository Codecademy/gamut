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
  /** Used to link expandable content with the component that does the expanding, i.e. it's used to set the value for aria-controls  */
  id?: string;
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
  gridColumn: { _: 'span 2', xs: 'span 12' },
});

const DivExpand = styled(motion.div)(expandStyles);
const TDExpand = styled(motion.td)(expandStyles);

const ExpandInCollapseOut: React.FC<
  WithChildrenProp & { as: 'td' | 'div', id: string }
> = ({ as, children, id }) => {
  const ResponsiveExpand = as === 'td' ? TDExpand : DivExpand;

  return (
    <ResponsiveExpand
      id={id}
      initial="collapsed"
      exit="collapsed"
      animate="expanded"
      variants={{
        expanded: { height: 'auto' },
        collapsed: { height: 0 },
      }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      {children}
    </ResponsiveExpand>
  );
};

export const ListRow = forwardRef<HTMLLIElement, ListRowProps>(
  (
    {
      id,
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
          aria-controls={onClick ? id : ''}
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
        rowBreakpoint={isTable && renderExpanded ? 'grid' : rowBreakpoint}
        isOl={renderNumbering}
        role={role}
        tabIndex={tabIndex}
        gridAutoRows={{ _: undefined, xs: 'minmax(1.5rem, max-content) 6fr' }}
        gridTemplateColumns={{
          _: 'minmax(0, 1fr) max-content',
          xs: gridTemplateColumns,
        }}
        {...wrapperProps}
      >
        <>
          {content}
          <AnimatePresence>
            {expanded && (
              <ExpandInCollapseOut as={isTable ? 'td' : 'div'} id={id ?? ''}>
                <Box role="region" aria-label={expandedRowAriaLabel} >
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
