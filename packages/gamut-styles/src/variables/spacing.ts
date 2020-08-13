import { pxRem } from '../utilities/pxRem';
import { base } from './base';

export const baseUnit = pxRem(base);

export const headerHeight = pxRem(base * 4);

export const spacing = {
  xs: pxRem(base / 4),
  sm: pxRem(base / 2),
  md: baseUnit,
  lg: pxRem(base * 2),
  xl: pxRem(base * 3),
  xxl: pxRem(base * 5),
};
