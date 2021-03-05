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

const columnProps = props.create({
  display: { property: 'display' },
  rowspan: {
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

export const Column = styled(
  'div',
  createStyledConfig(columnProps.propNames)
)(columnProps);

Column.defaultProps = { display: 'grid' };
