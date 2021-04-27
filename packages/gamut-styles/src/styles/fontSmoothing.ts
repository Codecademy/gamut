import { ThemeProps } from '@codecademy/variance';

const variants = {
  pixel: {
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
  },
  subpixel: {
    '-webkit-font-smoothing': 'subpixel-antialiased',
    '-moz-osx-font-smoothing': 'auto',
  },
};

export const fontSmoothing = <
  T extends ThemeProps<Partial<Record<'smoothing', 'pixel' | 'subpixel'>>>
>({
  smoothing = 'pixel',
}: T) => variants[smoothing];
