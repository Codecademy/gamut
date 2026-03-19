import { pxRem, useVariance } from '@codecademy/gamut-styles';
import { forwardRef, HTMLAttributes } from 'react';
import * as React from 'react';

const tableWrapperStyles = ({ theme }: any) => ({
  border: `1px solid ${theme.colors['gray-300']}`,
  maxHeight: '500px',
  overflow: 'auto',
  marginBottom: '1rem',
  table: {
    fontFamily: theme.fontFamily.monospace,
    padding: pxRem(10),
    width: '100%',
    color: theme.colors.black,
    position: 'relative',
    thead: {
      position: 'relative',
    },
    tr: {
      height: pxRem(30),
      fontSize: pxRem(13),
    },
    'tr:nth-of-type(odd)': {
      backgroundColor: theme.colors['gray-100'],
    },
    'td, th': {
      paddingLeft: '0.5rem',
      textAlign: 'inherit',
      verticalAlign: 'middle',
      color: theme.colors.black,
    },
    'tr:nth-of-type(even), th': {
      backgroundColor: theme.colors.white,
    },
  },
});

const TableWrapper = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { rest } = useVariance(props, tableWrapperStyles);
  return <div ref={ref} {...rest} />;
});

export const Table: React.FC<HTMLAttributes<HTMLTableElement>> = (props) => {
  return (
    <TableWrapper>
      <table {...props} />
    </TableWrapper>
  );
};
