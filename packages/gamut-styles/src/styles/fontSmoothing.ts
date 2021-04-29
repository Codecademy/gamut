import { variance } from '@codecademy/variance';

const smoothing = {
  pixel: {
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
  subpixel: {
    WebkitFontSmoothing: 'subpixel-antialiased',
    MozOsxFontSmoothing: 'auto',
  },
};

export const fontSmoothing = variance.create({
  fontSmoothing: {
    property: 'fontSmooth',
    scale: { pixel: 'pixel', subpixel: 'subpixel' },
    transform: (value: keyof typeof smoothing) => smoothing[value],
  },
});

export const fontSmoothPixel = fontSmoothing({ fontSmoothing: 'pixel' });

export const fontSmoothSubpixel = fontSmoothing({ fontSmoothing: 'subpixel' });
