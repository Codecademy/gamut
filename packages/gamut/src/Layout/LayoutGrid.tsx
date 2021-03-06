import { pxRem } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { createStyledConfig, props } from '../utils/variance';

const gutters = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const gridProps = props.create({
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
});

export const LayoutGrid = styled(
  'div',
  createStyledConfig(gridProps.propNames)
)(
  gridProps,
  css`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(12, minmax(0, 1fr));
  `
);
