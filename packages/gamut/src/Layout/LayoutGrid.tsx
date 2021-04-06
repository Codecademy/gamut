import { pxRem, styledConfig, system } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';

const gutters = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const grid = variance.create({
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
    transform: (height: string) => `minmax(${pxRem(height)}, 1fr)`,
  },
});

const gridProps = variance.compose(system.space, grid);

interface GridProps extends StyleProps<typeof gridProps> {}

export const LayoutGrid = styled(
  'div',
  styledConfig(grid.propNames)
)<GridProps>(
  system.css({
    display: 'grid',
    width: '100%',
    gridTemplateColumns: `repeact(12, minmax(0, 1fr))`,
  }),
  gridProps
);
