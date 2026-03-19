import { createComponent, css, styledOptions } from '@codecademy/gamut-styles';

import { boxProps, FlexBoxProps, flexStates, sharedStates } from './props';

export const FlexBox = createComponent(
  'div',
  styledOptions(['fit', 'wrap', 'center', 'column', 'row', 'inline'])
)<FlexBoxProps>(css({ display: 'flex' }), sharedStates, flexStates, boxProps);

export type { FlexBoxProps } from './props';
