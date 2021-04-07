import { variance } from '@codecademy/variance';

type FontSmoothing = 'pixel' | 'subpixel';

const smoothing = {
  pixel: 'pixel',
  subpixel: 'subpixel',
} as const;

const smoothingVariants = {
  pixel: {
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
  },
  subpixel: {
    '-webkit-font-smoothing': 'subpixel-antialiased',
    '-moz-osx-font-smoothing': 'auto',
  },
};

export const fontSmoothing = variance.create({
  fontSmooth: {
    property: 'fontSmooth',
    scale: smoothing,
    transform: (value = 'pixel') => smoothingVariants[value as FontSmoothing],
  },
});
