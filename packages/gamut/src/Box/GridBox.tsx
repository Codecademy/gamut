import {
  scales,
  styledConfig,
  system,
  transformGridItem,
  transformGridItemRatio,
} from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';

import { boxProps } from './props';

const gridAliasProps = variance.create({
  flow: {
    property: 'gridAutoFlow',
    scale: {
      row: 'row',
      column: 'column',
      dense: 'dense',
      'column-dense': 'column dense',
      'row-dense': 'row dense',
    },
  },
  cols: {
    property: 'gridTemplateColumns',
    transform: transformGridItemRatio,
    scale: scales.STRING_OR_NUMBER,
  },
  rows: {
    property: 'gridTemplateRows',
    transform: transformGridItemRatio,
    scale: scales.STRING_OR_NUMBER,
  },
  autoRows: {
    property: 'gridAutoRows',
    transform: transformGridItem,
  },
  autoCols: {
    property: 'gridAutoColumns',
    transform: transformGridItem,
  },
  alignAll: {
    property: 'justifyContent',
    properties: ['justifyContent', 'alignItems'],
  },
});

const gridProps = variance.compose(boxProps, gridAliasProps);

export interface GridBoxProps extends StyleProps<typeof gridProps> {}

export const GridBox = styled('div', styledConfig)<GridBoxProps>(
  system.css({ display: 'grid' }),
  gridProps
);
