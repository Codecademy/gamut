import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { responsiveProp } from './utilities';

import { ColumnSizes, OffsetColumnSizes } from './types';
import {
  ResponsiveProperty,
  OptionalResponsiveProperty,
} from '../typings/responsive-properties';

export type ColumnProps = {
  /** The number of columns this element should span out of 12 */
  size: ResponsiveProperty<ColumnSizes>;
  /** The column that this element should start at */
  offset?: OptionalResponsiveProperty<OffsetColumnSizes>;
};

export const Column = styled.div<ColumnProps>`
  display: grid;

  ${responsiveProp(
    'size',
    (size: ColumnSizes) => css`
      grid-column-end: span ${size};
    `
  )}
  ${responsiveProp(
    'offset',
    (offset: OffsetColumnSizes) => css`
      grid-column-start: ${offset === 0 ? 'auto' : offset + 1};
    `
  )}
`;

export default Column;
