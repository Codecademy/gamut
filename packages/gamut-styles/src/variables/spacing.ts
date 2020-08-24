import { pxRem } from '../utilities/pxRem';
import { base } from './base';

export const baseUnit = pxRem(base);

export const headerHeight = pxRem(base * 4);

export const spacing = {
  [base * 0.25]: pxRem(base * 0.25),
  [base * 0.5]: pxRem(base * 0.5),
  [base * 1]: pxRem(base * 1),
  [base * 1.5]: pxRem(base * 1.5),
  [base * 2]: pxRem(base * 2),
  [base * 3]: pxRem(base * 3),
};
