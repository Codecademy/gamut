import { variance } from '@codecademy/variance';
import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';

const varia = variance.withTheme<Theme>();

export const LayoutGrid = styled.div(
  varia.create({
    gap: {
      property: 'columnGap',
      properties: ['rowGap', 'columnGap'],
      scale: 'gutter',
    },
    gapX: { property: 'columnGap', scale: 'gutter' },
    gapY: { property: 'rowGap', scale: 'gutter' },
    rowHeight: {
      property: 'gridAutoRows',
      transform: (height) => `minmax(${height}, 1fr)`,
    },
  }),
  () => css`
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
  `
);

export const Column = styled.div(
  varia.create({
    p: { property: 'padding', scale: 'spacing' },
    bg: {
      property: 'background',
    },
    rows: {
      property: 'gridRow',
      transform: (row) => `span ${row}`,
    },
    size: {
      property: 'gridColumnEnd',
      scale: 'grid',
      transform: (col) => `span ${col}`,
    },
    offset: {
      property: 'gridColumnStart',
      scale: 'grid',
      transform: (col: string) =>
        col === '0' ? 'auto' : `${parseInt(col, 10) + 1}`,
    },
  }),
  () => css`
    display: grid;
    grid-template-columns: minmax(0, 1fr);
  `
);
