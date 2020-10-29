import { pxRem } from '../utilities/pxRem';
import { base } from './base';

export const baseUnit = pxRem(base);

export const headerHeight = pxRem(base * 4);

export const spacing = {
  0: 0,
  4: pxRem(4),
  8: pxRem(8),
  12: pxRem(12),
  16: pxRem(16),
  20: pxRem(20),
  24: pxRem(24),
  28: pxRem(28),
  32: pxRem(32),
  36: pxRem(36),
  48: pxRem(48),
  64: pxRem(64),
} as const;
