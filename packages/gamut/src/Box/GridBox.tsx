import { styledConfig, system } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import { get } from 'lodash';

import { boxProps } from './props';

const gridItemMap: Record<string, string> = {
  max: 'max-content',
  min: 'min-content',
};

const numberRegex = new RegExp(/^[0-9]*$/);
const isUnitlessNumber = (val: string) => numberRegex.test(val);

const gridItem = (item: string) => `minmax(0, ${item})`;

const templateGridItem = (item: string) =>
  gridItem(isUnitlessNumber(item) ? `${item}fr` : get(gridItemMap, item, item));

const repeatGridItem = (item: string, count: number) => {
  const template = templateGridItem(item);
  return count > 1 ? ` repeat(${count}, ${template})` : template;
};

const parseGridRatio = (val: string) => {
  const items = val.split(':');
  let repeated: [string, number] = ['', 0];
  let gridStyle = '';

  for (let i = 0; i < items.length + 1; i += 1) {
    const curr = items[i];
    if (repeated?.[0] !== curr) {
      if (repeated[0].length) gridStyle += repeatGridItem(...repeated);
      if (curr) repeated = [curr, 1];
    } else {
      repeated[1] += 1;
    }
  }

  return gridStyle;
};

const gridAliasProps = variance.create({
  flow: {
    property: 'gridAutoFlow',
    scale: {
      row: 'row',
      column: 'column',
      dense: 'dense',
      'column-dense': 'column dense',
      'row-dense': 'row-dense',
    },
  },
  cols: {
    property: 'gridTemplateColumns',
    transform: parseGridRatio,
  },
  rows: {
    property: 'gridTemplateRows',
    transform: parseGridRatio,
  },
  autoRows: {
    property: 'gridAutoRows',
    transform: templateGridItem,
  },
  autoCols: {
    property: 'gridAutoColumns',
    transform: templateGridItem,
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
