import { styledConfig, system } from '@codecademy/gamut-styles';
import { compose, createProps, StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';

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

const gridProps = createProps({
  rowOffset: {
    property: 'gridRowStart',
    scale: rows,
    transform: (row: number) => (row === 0 ? 'auto' : row),
  },
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

const columnVariants = system.variant({
  variants: {
    fitContent: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1fr)',
    },
  },
});

const columnProps = compose(
  system.layout,
  system.space,
  system.grid,
  gridProps
);

export type ColumnVariantProps = StyleProps<typeof columnVariants>;
export type ColumnStyleProps = StyleProps<typeof columnProps>;

export interface ColumnProps extends ColumnVariantProps, ColumnStyleProps {}

export const Column = styled(
  'div',
  styledConfig(columnProps.propNames)
)<ColumnProps>(columnVariants, columnProps);

Column.defaultProps = { variant: 'fitContent', size: 12 };
