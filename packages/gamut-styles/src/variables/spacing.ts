import { pxRem } from '../utilities/pxRem';
import { base } from './base';

export const baseUnit = pxRem(base);

export const headerHeight = pxRem(base * 4);

export type SpaceSizes = 4 | 8 | 16 | 24 | 32 | 48;

export const spacing: Record<SpaceSizes, string> = {
  4: pxRem(4),
  8: pxRem(8),
  16: pxRem(16),
  24: pxRem(24),
  32: pxRem(32),
  48: pxRem(48),
};
