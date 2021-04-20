import { BoxProps } from '@codecademy/gamut';

export type PatternProps = BoxProps & {};

export type PatternName =
  | 'CheckerLoose'
  | 'CheckerRegular'
  | 'DiagonalStripeBDense'
  | 'DiagonalStripeBLoose'
  | 'DiagonalStripeBRegular'
  | 'DotLoose';
