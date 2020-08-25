import diagonal from './assets/diagonal.png';
import dotted from './assets/dotted.png';
import matrix from './assets/matrix.png';

export type PatternFills = 'diagonal' | 'dotted' | 'matrix';

export const PATTERN_VARIANTS: Record<PatternFills, string> = {
  diagonal,
  dotted,
  matrix,
};
