import { variance } from '@codecademy/variance';

const smoothing = {
  pixel: {
    WebKitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
  subpixel: {
    WebKitFontSmoothing: 'subpixel-antialiased',
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
