import { isNumber } from 'lodash';

import { percentageOrAbsolute } from '../percentageOrAbsolute';

const valueWithUnit = /(\-?\d*\.?\d+)(%|\w*)/;

export const parseSize = (value: string | number) => {
  if (isNumber(value)) {
    return percentageOrAbsolute(value);
  }
  const [match, number, unit] = value.match(valueWithUnit) || [];

  if (match === undefined) {
    return value;
  }
  const numericValue = parseFloat(number);

  return !unit ? percentageOrAbsolute(numericValue) : `${numericValue}${unit}`;
};
