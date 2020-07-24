import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { GapSizes } from './types';
import { ResponsiveProperty } from '../typings/responsive-properties';
import { responsiveProp } from './utilities';
import { GAP_SIZES } from './constants';

export type LayoutGridProps = {
  /** The grid-gap size that should be present between rows */
  rowGap?: ResponsiveProperty<GapSizes>;
  /** The grid-gap size that should be present between columns */
  columnGap?: ResponsiveProperty<GapSizes>;
};

export const LayoutGrid = styled.div<LayoutGridProps>`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));

  ${responsiveProp(
    'columnGap',
    (value: GapSizes) => css`
      grid-column-gap: ${GAP_SIZES[value]};
    `
  )}

  ${responsiveProp(
    'rowGap',
    (value: GapSizes) => css`
      grid-row-gap: ${GAP_SIZES[value]};
    `
  )}
`;

LayoutGrid.defaultProps = {
  rowGap: 'sm',
  columnGap: 'sm',
};
