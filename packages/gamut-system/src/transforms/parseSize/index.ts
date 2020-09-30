import { isNumber } from 'lodash';
import { percentageOrAbsolute } from '../percentageOrAbsolute';

export const parseSize = (value: string | number) => {
  if (isNumber(value)) {
    return percentageOrAbsolute(value);
  }
  const [, number, unit] = value.match(/(\-?\d*\.?\d+)(%|\w*)/) ?? [];
  const numericValue = parseFloat(number);
  return !unit ? percentageOrAbsolute(numericValue) : `${numericValue}${unit}`;
};
