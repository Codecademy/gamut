import { CheckerDense } from './CheckerDense';
import { CheckerLoose } from './CheckerLoose';
import { CheckerRegular } from './CheckerRegular';
import { DiagonalStripeBDense } from './DiagonalStripeBDense';
import { DiagonalStripeBLoose } from './DiagonalStripeBLoose';
import { DiagonalStripeBRegular } from './DiagonalStripeBRegular';
import { DotLoose } from './DotLoose';

export const getPattern = (name: string) => {
  switch(name) {
    case 'CheckerDense':
      return CheckerDense;
    case 'CheckerLoose':
      return CheckerLoose;
    case 'CheckerRegular':
      return CheckerRegular;
    case 'DiagonalStripeBDense':
      return DiagonalStripeBDense;
    case 'DiagonalStripeBLoose':
      return DiagonalStripeBLoose;
    case 'DiagonalStripeBRegular':
      return DiagonalStripeBRegular;
    case 'DotLoose':
      return DotLoose;
    default:
      return DiagonalStripeBLoose;
  }
}
