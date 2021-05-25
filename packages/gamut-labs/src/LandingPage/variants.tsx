import { system } from '@codecademy/gamut-styles';

export const darkModeVariants = system.variant({
  prop: 'mode',
  defaultVariant: 'light',
  variants: {
    dark: {
      textColor: 'beige',
    },
    light: {
      textColor: 'navy',
    },
  },
});
