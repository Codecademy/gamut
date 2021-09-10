import { isNumber } from 'lodash';

export const percentageOrAbsolute = (coordinate: number) => {
  if (coordinate === 0) {
    return coordinate;
  }
  if (coordinate <= 1 && coordinate >= -1) {
    return `${coordinate * 100}%`;
  }
  return `${coordinate}px`;
};

const valueWithUnit = /(-?\d*\.?\d+)(%|\w*)/;

export const transformSize = (value: string | number) => {
  if (isNumber(value)) {
    return percentageOrAbsolute(value);
  }

  if (value.includes('calc')) {
    return value;
  }

  const [match, number, unit] = valueWithUnit.exec(value) || [];

  if (match === undefined) {
    return value;
  }

  const numericValue = parseFloat(number);

  return !unit ? percentageOrAbsolute(numericValue) : `${numericValue}${unit}`;
};
