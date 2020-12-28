import React, { Fragment, ReactNode, useState } from 'react';
import { styled } from '@storybook/theming';
import { variant } from '../styles';
import { HandlerProps } from '@codecademy/gamut-system/src';
import {
  ArrowChevronDownIcon,
  ArrowChevronUpIcon,
} from '@codecademy/gamut-icons';

type ColumnSizes = 'sm' | 'md' | 'lg' | 'fill';

type ColumnConfig = {
  key: string;
  name?: string;
  size?: ColumnSizes;
  render?: (row: object) => ReactNode | string;
};

const TableEl = styled.div`
  display: grid;
`;

const rowVariants = variant({
  inset: {
    borderStyle: 'solid',
    borderStyleTop: 'none',
    borderWidth: '1px',
    borderColor: '#eeeeee',
    backgroundColor: '#F6F9FC',
    padding: '2rem',
  },
});

const RowEl = styled.div`
  display: flex;
  max-width: 100%;
  border-bottom: 1px solid #eeeeee;
  ${rowVariants}

  &:last-child {
    border-bottom: none;
  }
`;

const colSizes = variant({
  prop: 'size',
  variants: {
    sm: {
      flexBasis: '4rem',
      maxWidth: '4rem',
    },
    md: {
      flexBasis: '8rem',
      maxWidth: '8rem',
    },
    lg: {
      flexBasis: '12rem',
      maxWidth: '12rem',
    },
    fill: {
      flexGrow: 1,
      flexShrink: 0,
      flexBasis: 0,
    },
  },
});

const colVariants = variant({
  header: {
    fontWeight: 700,
    fontSize: '1rem',
  },
});

type ColProps = HandlerProps<typeof colVariants> &
  HandlerProps<typeof colSizes>;

const ColEl = styled.div<ColProps>`
  ${colSizes}
  ${colVariants}
  padding: 16px 12px;

  &:first-child {
    padding-left: 4px;
  }
  &::last-child {
    padding-right: 4px;
  }
`;

const ExpandButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
`;

type DataTableProps = {
  idKey: string;
  rows: Record<string, string>[];
  columns: ColumnConfig[];
  renderRowExpand?: (row: Record<string, string>) => ReactNode;
};

export const DataTable: React.FC<DataTableProps> = ({
  idKey = 'id',
  rows,
  columns,
  renderRowExpand,
}) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  return (
    <TableEl>
      <RowEl>
        {columns.map(({ key, name, size }) => (
          <ColEl variant="header" size={size}>
            {name ? name : key}
          </ColEl>
        ))}
        {renderRowExpand && <ColEl size="sm" />}
      </RowEl>
      {rows.map((row, i) => {
        const isExpanded = i === expandedRow;
        return (
          <Fragment key={`row-${row?.[idKey]}`}>
            <RowEl>
              {columns.map(({ key, size, render }) => {
                return (
                  <ColEl key={`col-${key}-${row?.[idKey]}`} size={size}>
                    {render ? render(row) : row?.[key]}
                  </ColEl>
                );
              })}
              {renderRowExpand && (
                <ColEl size="sm">
                  <ExpandButton
                    onClick={() => setExpandedRow(isExpanded ? null : i)}
                  >
                    {isExpanded ? (
                      <ArrowChevronUpIcon />
                    ) : (
                      <ArrowChevronDownIcon />
                    )}
                  </ExpandButton>
                </ColEl>
              )}
            </RowEl>
            {isExpanded && (
              <RowEl variant="inset">
                <ColEl size="fill">
                  {renderRowExpand && renderRowExpand(row)}
                </ColEl>
              </RowEl>
            )}
          </Fragment>
        );
      })}
    </TableEl>
  );
};
