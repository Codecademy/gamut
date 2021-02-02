import { variant } from '@codecademy/gamut-styles';

import { ColorMode } from './types';

export const modeVariants = variant<'mode', ColorMode>({
  prop: 'mode',
  variants: {
    dark: {
      textColor: 'beige',
    },
    light: {
      textColor: 'navy',
    },
  },
});
