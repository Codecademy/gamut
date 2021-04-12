import { colors } from './colors';

const { black, white } = colors;

/**
 * @deprecated
 * Using these variables directly is no longer supported.
 *
 * Please use [`theme.colors`](https://gamut.codecademy.com/storybook/?path=/docs/foundations-theme--colors#standard-colors)
 */

export const deprecatedColors = {
  blue: {
    '100': '#c8d7fa',
    '200': '#a5befa',
    '300': '#7da2fa',
    '400': '#5788fa',
    '500': '#3069f0',
    '600': '#2d5dcc',
    '700': '#2e4a99',
    '800': '#233466',
    '900': '#141c3a',
    '1000': '#10162f',
    '1100': '#0a0e1d',
  },
  pink: {
    '100': '#ffd9fc',
    '200': '#ffbffa',
    '300': '#ffa6f8',
    '400': '#f288e9',
    '500': '#d957d9',
    '600': '#b035c9',
    '700': '#9129a6',
    '800': '#702080',
    '900': '#43134d',
  },
  purple: {
    '100': '#d5ccff',
    '200': '#c0b6f2',
    '300': '#ac9df2',
    '400': '#917ef2',
    '500': '#7c5ce6',
    '600': '#6437cc',
    '700': '#4b2999',
    '800': '#381f73',
    '900': '#231347',
  },
  red: {
    '100': '#ffd3cc',
    '200': '#ffb8ad',
    '300': '#ff988c',
    '400': '#ff7566',
    '500': '#fd4d3f',
    '600': '#e53935',
    '700': '#bf2e2c',
    '800': '#992523',
    '900': '#661917',
  },
  green: {
    '100': '#bbfae5',
    '200': '#91f2d2',
    '300': '#6aebc0',
    '400': '#4fe0b0',
    '500': '#47cca0',
    '600': '#3eb38c',
    '700': '#318c6e',
    '800': '#246650',
    '900': '#164032',
  },
  orange: {
    '100': '#FFE9C8',
    '200': '#FFD093',
    '300': '#FFB764',
    '400': '#FF9F3C',
    '500': '#FF881D',
    '600': '#FB7106',
    '700': '#DC5A03',
    '800': '#BA4604',
    '900': '#963606',
  },
  yellow: {
    '100': '#fff7cc',
    '200': '#fff2b3',
    '300': '#ffec8c',
    '400': '#ffe359',
    '500': '#ffd500',
    '600': '#ffb92e',
    '700': '#e69729',
    '800': '#b37620',
    '900': '#805417',
  },
  gray: {
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
  royalBlue: '#6400e4',
  black,
  white,
} as const;

/**
 * @deprecated
 * Using these variables directly is no longer supported.
 *
 * Please use [`theme.colors`](https://gamut.codecademy.com/storybook/?path=/docs/foundations-theme--colors#standard-colors)
 */

export const brandColors = {
  red: deprecatedColors.red[500],
  orange: deprecatedColors.orange[400],
  yellow: deprecatedColors.yellow[500],
  purple: deprecatedColors.royalBlue,
  pink: deprecatedColors.pink[400],
  magenta: deprecatedColors.pink[700],
  mint: deprecatedColors.green[300],
  beige: '#efd9ca',
  blue: deprecatedColors.blue[500],
  darkBlue: deprecatedColors.blue[900],
  lavender: deprecatedColors.purple[500],
} as const;
