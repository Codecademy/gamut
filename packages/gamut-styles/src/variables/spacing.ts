import { pxRem } from '../utilities/pxRem';
import { base } from './base';

export const baseUnit = pxRem(base);

export const headerHeight = pxRem(base * 4);

export const spacing = {
  xxs: pxRem(base * 0.25),
  xs: pxRem(base * 0.5),
  sm: pxRem(base * 0.75),
  md: pxRem(base * 1),
  lg: pxRem(base * 1.5),
  xl: pxRem(base * 2.5),
  xxl: pxRem(base * 4),
};
