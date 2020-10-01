import { isNumber } from 'lodash';
import { percentageOrAbsolute } from '../percentageOrAbsolute';

export const parseSize = (value: string | number) => {
  if (isNumber(value)) {
    return percentageOrAbsolute(value);
  }
  const [match, number, unit] = value.match(/(\-?\d*\.?\d+)(%|\w*)/) ?? [];
  if (!match) {
    return value;
  }
  const numericValue = parseFloat(number);
  return !unit ? percentageOrAbsolute(numericValue) : `${numericValue}${unit}`;
};
