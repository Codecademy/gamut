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

export const fontSmoothing = (value: number | string = 'pixel') =>
  smoothingVariants[value as 'pixel' | 'subpixel'];
