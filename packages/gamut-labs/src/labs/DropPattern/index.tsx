import { createDropPattern } from '@codecademy/gamut-styles';
import diagonal from './assets/diagonal.png';
import dotted from './assets/dotted.png';
import matrix from './assets/matrix.png';

export const patterns = {
  diagonal: createDropPattern({
    url: diagonal,
    xOffset: '1rem',
    yOffset: '1rem',
  }),
  dotted: createDropPattern({
    url: dotted,
    xOffset: '1rem',
    yOffset: '1rem',
  }),
  matrix: createDropPattern({
    url: matrix,
    xOffset: '1rem',
    yOffset: '1rem',
  }),
};
