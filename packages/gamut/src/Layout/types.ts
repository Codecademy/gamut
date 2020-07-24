import { breakpoints } from '@codecademy/gamut-styles/utils/variables';

export type ColumnSizes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type OffsetColumnSizes = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export type GapSizes = 'sm' | 'md' | 'lg' | 'xl';

export type MediaSize = keyof typeof breakpoints;
export type ValidValues = string | number | boolean;
