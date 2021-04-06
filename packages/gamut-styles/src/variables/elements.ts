import { pxRem } from '../styles';
import { breakpoints } from './responsive';

export const contentWidths = {
  md: pxRem(breakpoints.lg),
  max: pxRem(breakpoints.xl),
};

export const header = {
  height: { base: '4rem', md: '5rem' },
} as const;
