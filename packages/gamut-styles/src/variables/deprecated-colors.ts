import { flattenScale } from '@codecademy/variance';

import { corePalette } from './colors';

const { black, white } = corePalette;

/**
 * @deprecated
 * Using these variables directly is no longer supported.
 *
 * Please use [`theme.colors`](https://gamut.codecademy.com/storybook/?path=/docs/foundations-theme--colors#standard-colors)
 */

export const interactiveColors = {
  dark: corePalette.hyper,
  light: corePalette.yellow,
} as const;

/**
 * @deprecated
 * Using these variables directly is no longer supported.
 *
 * Please use [`theme.colors`](https://gamut.codecademy.com/storybook/?path=/docs/foundations-theme--colors#standard-colors)
 */

export const editorColors = {
  blue: '#83fff5',
  deepPurple: '#cc7bc2',
  gray: '#939598',
  green: '#b4d353',
  orange: '#ff8973',
  purple: '#b3ccff',
  red: '#ea6c8b',
  yellow: '#ffe083',
} as const;

/**
 * @deprecated
 * Using these variables directly is no longer supported.
 *
 * Please use [`theme.colors`](https://gamut.codecademy.com/storybook/?path=/docs/foundations-theme--colors#standard-colors)
 */

export const platformColors = {
  mint: {
    '500': '#37c3be',
    '600': '#2c9c98',
    '700': '#217572',
  },
  purple: {
    '200': '#c3c1d7',
    '300': '#a5a1c2',
    '400': '#8782ae',
    '500': '#69639a',
    '600': '#544f7b',
    '700': '#3f3b5c',
    '800': '#2a283e',
    '900': '#15141f',
  },
} as const;

/**
 * @deprecated
 * Using these variables directly is no longer supported.
 *
 * Please use [`theme.colors`](https://gamut.codecademy.com/storybook/?path=/docs/foundations-theme--colors#standard-colors)
 */

export const swatches = {
  beige: {
    '0': '#FFF0E5',
  },
  blue: {
    '0': '#F5FCFF',
    '300': '#66C4FF',
    '500': '#1557FF',
    '800': '#1D2340',
    '900': '#10162f',
  },
  green: {
    '0': '#F5FFE3',
    '400': '#AEE938',
    '700': '#008A27',
  },
  yellow: {
    '0': '#FFFAE5',
    '400': '#CCA900',
    '500': '#FFD300',
  },
  pink: {
    '0': '#FFF5FF',
    '400': '#F966FF',
  },
  red: {
    '500': '#E91C11',
  },
  orange: {
    '500': '#FF8C00',
  },
  hyper: {
    '400': '#5533FF',
    '500': '#3A10E5',
  },
  gray: {
    '0': white,
    '100': '#f6f5fa',
    '200': '#dddce0',
    '300': '#c4c3c7',
    '400': '#a2a2a6',
    '500': '#828285',
    '600': '#646466',
    '700': '#4b4b4d',
    '800': '#323233',
    '900': '#19191a',
  },
} as const;

/**
 * @deprecated
 * Using these variables directly is no longer supported.
 *
 * Please use [`theme.colors`](https://gamut.codecademy.com/storybook/?path=/docs/foundations-theme--colors#standard-colors)
 */

const trueColors = {
  beige: swatches.beige[0],
  blue: swatches.blue[500],
  green: swatches.green[700],
  hyper: swatches.hyper[500],
  lightBlue: swatches.blue[300],
  lightGreen: swatches.green[400],
  navy: swatches.blue[900],
  orange: swatches.orange[500],
  paleBlue: swatches.blue[0],
  paleGreen: swatches.green[0],
  palePink: swatches.pink[0],
  paleYellow: swatches.yellow[0],
  pink: swatches.pink[400],
  red: swatches.red[500],
  yellow: swatches.yellow[500],
  black,
  white,
} as const;

/**
 * @deprecated
 * Using these variables directly is no longer supported.
 *
 * Please use [`theme.colors`](https://gamut.codecademy.com/storybook/?path=/docs/foundations-theme--colors#standard-colors)
 */

export const colors = {
  ...flattenScale(swatches),
  ...trueColors,
} as const;
