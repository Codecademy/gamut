import { createComponent, styledOptions, system } from '@codecademy/gamut-styles';

import { boxProps, GridBoxProps, gridStates, sharedStates } from './props';

export const GridBox = createComponent(
  'div',
  styledOptions(['fit', 'center', 'fitContent'])
)<GridBoxProps>(
  system.css({ display: 'grid' }),
  sharedStates,
  gridStates,
  boxProps
);
