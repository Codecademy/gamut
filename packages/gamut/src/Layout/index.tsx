import { pxRem } from '@codecademy/gamut-styles';
import { variance } from '@codecademy/variance';
import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';

const props = variance.withTheme<Theme>();

const gutters = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const rows = {
  1: 1,
  2: 2,
  3: 3,
};

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
  12: 12,
};

export const LayoutGrid = styled.div(
  props.create({
    gap: {
      property: 'gap',
      properties: ['rowGap', 'columnGap'],
      scale: gutters,
      transform: pxRem,
    },
    rowGap: { property: 'rowGap', scale: gutters, transform: pxRem },
    columnGap: { property: 'columnGap', scale: gutters, transform: pxRem },
    rowHeight: {
      property: 'gridAutoRows',
      transform: (height: string) => `minmax(${height}, 1fr)`,
    },
  }),
  css`
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
  `
);
export const Column = styled.div(
  props.create({
    rowspan: {
      property: 'gridRowEnd',
      scale: rows,
      transform: (row) => `span ${row}`,
    },
    size: {
      property: 'gridColumnEnd',
      scale: columns,
      transform: (col: number) => `span ${col}`,
    },
    offset: {
      property: 'gridColumnStart',
      scale: columns,
      transform: (col: number) => (col === 0 ? 'auto' : `${col + 1}`),
    },
  }),
  css`
    display: grid;
  `
);
