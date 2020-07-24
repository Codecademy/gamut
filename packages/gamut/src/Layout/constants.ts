import { GapSizes } from './types';

const BASE_REM = 1;

export const GAP_SIZES: Record<GapSizes, string> = {
  sm: `${BASE_REM / 2}rem`,
  md: `${BASE_REM}rem`,
  lg: `${BASE_REM * 2}rem`,
  xl: `${BASE_REM * 3}rem`,
};
