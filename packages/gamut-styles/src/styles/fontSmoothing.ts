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

export const fontSmoothing = ({
  smoothing = 'pixel',
}: Record<'smoothing', 'pixel' | 'subpixel'>) => variants[smoothing];
