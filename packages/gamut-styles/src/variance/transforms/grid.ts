import { get, isNumber } from 'lodash';

const gridItemMap: Record<string, string> = {
  max: 'max-content',
  min: 'min-content',
};

const numberRegex = new RegExp(/^[0-9]*$/);

const isUnitlessNumber = (val: string) => numberRegex.test(val);

export const transformGridItem = (item: string) => {
  const template = isUnitlessNumber(item)
    ? `${item}fr`
    : get(gridItemMap, item, item);
  return `minmax(0, ${template})`;
};

export const repeatGridItem = (item: string, count: number) => {
  const template = transformGridItem(item);
  return count > 1 ? `repeat(${count}, ${template})` : template;
};

export const parseGridRatio = (val: string) => {
  const items = val.split(':');
  let repeated: [string, number] = ['', 0];
  let gridStyle = '';

  for (let i = 0; i < items.length + 1; i += 1) {
    const delimiter = gridStyle.length > 0 ? ' ' : '';
    const curr = items[i];
    if (repeated?.[0] !== curr) {
      if (repeated[0].length)
        gridStyle += delimiter + repeatGridItem(...repeated);
      if (curr) repeated = [curr, 1];
    } else {
      repeated[1] += 1;
    }
  }

  return gridStyle;
};

export const transformGridItemRatio = (val: string | number) => {
  return isNumber(val) ? repeatGridItem('1', val) : parseGridRatio(val);
};
