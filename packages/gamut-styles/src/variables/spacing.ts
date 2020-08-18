import { pxRem } from '../utilities/pxRem';
import { base } from './base';

export const baseUnit = pxRem(base);

export const headerHeight = pxRem(base * 4);

export const spacing = {
  xs: pxRem(base * 0.25),
  sm: pxRem(base * 5),
  md: pxRem(base * 1),
  lg: pxRem(base * 1.5),
  xl: pxRem(base * 2),
  xxl: pxRem(base * 2.5),
};
