import React, { ReactNode } from 'react';
import { styled } from '@storybook/theming';
import { variant } from '../styles';
import { HandlerProps } from '@codecademy/gamut-system/src';

type ColumnSizes = 'sm' | 'md' | 'lg' | 'fill';

type ColumnConfig = {
  key: string;
  name?: string;
  size?: ColumnSizes;
  render?: (row: object) => ReactNode | string;
};

const TableEl = styled.div`
  display: grid;
  row-gap: 1rem;
`;

const RowEl = styled.div`
  display: flex;
  max-width: 100%;
  border-bottom: 1px solid #eeeeee;
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
  padding: 4px 8px;

  &:first-child {
    padding-left: 4px;
  }
  &::last-child {
    padding-right: 4px;
  }
`;

export const DataTable: React.FC<{
  rows: Record<string, string>[];
  columns: ColumnConfig[];
}> = ({ rows, columns }) => {
  return (
    <TableEl>
      <RowEl>
        {columns.map(({ key, name, size }) => (
          <ColEl variant="header" size={size}>
            {name ? name : key}
          </ColEl>
        ))}
      </RowEl>
      {rows.map((row) => {
        return (
          <RowEl>
            {columns.map(({ key, size, render }) => {
              return (
                <ColEl size={size}>{render ? render(row) : row?.[key]}</ColEl>
              );
            })}
          </RowEl>
        );
      })}
    </TableEl>
  );
};
