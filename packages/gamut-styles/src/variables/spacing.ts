import { pxRem } from '../utilities/pxRem';

export const baseUnit = '1rem';

export const headerHeight = '4rem';

export const spacing = {
  4: pxRem(4),
  8: pxRem(8),
  16: pxRem(16),
  24: pxRem(24),
  32: pxRem(32),
  48: pxRem(48),
} as const;
