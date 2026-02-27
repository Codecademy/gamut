import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { forwardRef, MouseEvent } from 'react';
import * as React from 'react';

import { Box } from '../Box';
import { CompatibleComponentProps, WithChildrenProp } from '../utils';
import { RowEl } from './elements';
import { useListContext } from './ListProvider';
import { PublicListProps } from './types';

export interface RowProps
  extends Partial<PublicListProps<CompatibleComponentProps<typeof RowEl>>> {
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

const expandStyles = css({
  flexBasis: { _: '100%', c_base: 'undefined', c_sm: '100%' },
  flexShrink: { _: 0, c_base: undefined, c_sm: 0 },
  gridColumn: { _: undefined, c_base: 'span 3', c_sm: undefined },
  minWidth: { _: '100%', c_base: undefined, c_sm: '100%' },
  order: { _: 999, c_base: undefined, c_sm: 999 },
  overflow: 'hidden',
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
      ...rest
    },
    ref
  ) => {
    const { listType, scrollable, variant, ...rowConfig } = useListContext();
    const isOl = listType === 'ol';
    const isTable = listType === 'table';
    const { onClick, role, tabIndex, ...rowProps } = rest;
    const wrapperProps =
      (!renderExpanded && !onClick) || isTable
        ? { ...rowConfig, ...rowProps }
        : { spacing: keepSpacingWhileExpanded ? rowConfig.spacing : undefined };
    let content = children;
    const renderNumbering = isOl && renderExpanded === undefined && !onClick;

    if ((renderExpanded || Boolean(onClick)) && !isTable) {
      content = (
        <RowEl
          as="div"
          {...rowConfig}
          aria-expanded={renderExpanded && onClick ? expanded : undefined}
          interactive={Boolean(onClick)}
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
        flexWrap={
          isTable && renderExpanded
            ? { _: 'wrap', c_base: undefined, c_sm: 'wrap' }
            : { _: 'nowrap', c_base: undefined, c_sm: 'nowrap' }
        }
        gridTemplateColumns={{
          _: undefined,
          c_base: 'minmax(0, 1fr) max-content',
          c_sm: undefined,
        }}
        isOl={renderNumbering}
        role={role}
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
