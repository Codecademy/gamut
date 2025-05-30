import { pxRem } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { HTMLAttributes } from 'react';
import * as React from 'react';

const TableWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors['gray-300']};
  max-height: 500px;
  overflow: auto;
  margin-bottom: 1rem;

  table {
    font-family: ${({ theme }) => theme.fontFamily.monospace};
    padding: ${pxRem(10)};
    width: 100%;
    color: ${({ theme }) => theme.colors.black};
    position: relative;

    thead {
      position: relative;
    }

    tr {
      height: ${pxRem(30)};
      font-size: ${pxRem(13)};
    }

    tr:nth-of-type(odd) {
      background-color: ${({ theme }) => theme.colors['gray-100']};
    }

    td,
    th {
      padding-left: 0.5rem;
      text-align: inherit;
      vertical-align: middle;
      color: ${({ theme }) => theme.colors.black};
    }

    tr:nth-of-type(even),
    th {
      background-color: ${({ theme }) => theme.colors.white};
    }
  }
`;

export const Table: React.FC<HTMLAttributes<HTMLTableElement>> = (props) => {
  return (
    <TableWrapper>
      <table {...props} />
    </TableWrapper>
  );
};
