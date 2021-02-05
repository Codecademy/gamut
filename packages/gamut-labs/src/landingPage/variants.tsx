import { variant } from '@codecademy/gamut-styles';

export const darkModeVariants = variant({
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
