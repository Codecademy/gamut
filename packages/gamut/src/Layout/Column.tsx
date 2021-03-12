import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { createStyledConfig, props } from '../utils/variance';

const rows = { 1: 1, 2: 2, 3: 3 };

const columns = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: 11,
};

const layoutProps = props.create({
  display: { property: 'display' },
  w: { property: 'width' },
  maxW: { property: 'maxWidth' },
  minW: { property: 'minWidth' },
  h: { property: 'height' },
  maxH: { property: 'maxHeight' },
  minH: { property: 'minHeight' },
});

const paddingProps = props.create({
  p: {
    property: 'padding',
    properties: ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom'],
    scale: 'spacing',
  },
  pX: {
    property: 'padding',
    properties: ['paddingLeft', 'paddingRight'],
    scale: 'spacing',
  },
  pY: {
    property: 'padding',
    properties: ['paddingTop', 'paddingBottom'],
    scale: 'spacing',
  },
  pT: { property: 'paddingTop', scale: 'spacing' },
  pB: { property: 'paddingBottom', scale: 'spacing' },
  pR: { property: 'paddingRight', scale: 'spacing' },
  pL: { property: 'paddingLeft', scale: 'spacing' },
});

const gridProps = props.create({
  rowOffset: {
    property: 'gridRowStart',
    scale: rows,
    transform: (row: number) => (row === 0 ? 'auto' : row),
  },
  rowSize: {
    property: 'gridRowEnd',
    scale: rows,
    transform: (row) => `span ${row}`,
  },
  size: {
    property: 'gridColumnEnd',
    scale: { ...columns, 12: 12 },
    transform: (col: number) => `span ${col}`,
  },
  offset: {
    property: 'gridColumnStart',
    scale: { 0: 0, ...columns },
    transform: (col: number) => (col === 0 ? 'auto' : `${col + 1}`),
  },
});

const columnProps = props.compose(layoutProps, paddingProps, gridProps);

export const Column = styled('div', createStyledConfig(columnProps.propNames))(
  css`
    grid-template-columns: minmax(0, 1fr);
  `,
  columnProps
);

Column.defaultProps = { display: 'grid', size: 12 };
