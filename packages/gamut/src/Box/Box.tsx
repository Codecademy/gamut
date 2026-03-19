import { createComponent, styledOptions } from '@codecademy/gamut-styles';

import { BoxProps, boxProps, sharedStates } from './props';

export const Box = createComponent('div', styledOptions(['fit']))<BoxProps>(
  sharedStates,
  boxProps
);

export type { BoxProps } from './props';
