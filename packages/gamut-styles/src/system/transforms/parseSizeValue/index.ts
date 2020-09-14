import { isNumber } from 'lodash';
import { percentageOrAbsolute } from '../percentageOrAbsolute';

export const parseSize = (value: string | number) => {
  if (isNumber(value)) {
    return percentageOrAbsolute(value);
  }
  const normalizedValue = value.startsWith('.') ? `0${value}` : value;
  const numeric = parseFloat(normalizedValue);
  const isUnitless = numeric.toString().length === normalizedValue.length;
  return isUnitless ? percentageOrAbsolute(numeric) : normalizedValue;
};
