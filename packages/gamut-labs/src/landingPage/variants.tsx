import { variant } from '@codecademy/gamut-styles';
import { HandlerProps } from '@codecademy/gamut-system';

import { Mode } from './types';

export const darkModeVariants = variant<'mode', Mode>({
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

export type DarkModeProps = HandlerProps<typeof darkModeVariants>;
