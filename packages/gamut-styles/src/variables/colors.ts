import {
  COLOR_BEIGE_000,
  COLOR_BLUE_000,
  COLOR_BLUE_300,
  COLOR_BLUE_500,
  COLOR_BLUE_900,
  COLOR_GREEN_000,
  COLOR_GREEN_400,
  COLOR_GREEN_700,
  COLOR_YELLOW_000,
  COLOR_YELLOW_500,
  COLOR_PINK_000,
  COLOR_PINK_400,
  COLOR_RED_500,
  COLOR_ORANGE_500,
  COLOR_HYPER_500,
  COLOR_GRAY_100,
  COLOR_GRAY_200,
  COLOR_GRAY_300,
  COLOR_GRAY_400,
  COLOR_GRAY_500,
  COLOR_GRAY_600,
  COLOR_GRAY_700,
  COLOR_GRAY_800,
  COLOR_GRAY_900,
  COLOR_BLACK,
  COLOR_WHITE,
} from './color-constants';

export const swatches = {
  beige: {
    '0': COLOR_BEIGE_000,
  },
  blue: {
    '0': COLOR_BLUE_000,
    '300': COLOR_BLUE_300,
    '500': COLOR_BLUE_500,
    '900': COLOR_BLUE_900,
  },
  green: {
    '0': COLOR_GREEN_000,
    '400': COLOR_GREEN_400,
    '700': COLOR_GREEN_700,
  },
  yellow: {
    '0': COLOR_YELLOW_000,
    '500': COLOR_YELLOW_500,
  },
  pink: {
    '0': COLOR_PINK_000,
    '400': COLOR_PINK_400,
  },
  red: {
    '500': COLOR_RED_500,
  },
  orange: {
    '500': COLOR_ORANGE_500,
  },
  hyper: {
    '500': COLOR_HYPER_500,
  },
  gray: {
    '100': COLOR_GRAY_100,
    '200': COLOR_GRAY_200,
    '300': COLOR_GRAY_300,
    '400': COLOR_GRAY_400,
    '500': COLOR_GRAY_500,
    '600': COLOR_GRAY_600,
    '700': COLOR_GRAY_700,
    '800': COLOR_GRAY_800,
    '900': COLOR_GRAY_900,
  },
} as const;

export const colors = {
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
  black: COLOR_BLACK,
  white: COLOR_WHITE,
} as const;

export const colorNames = {
  beige: 'Bagel',
  blue: 'A Train',
  green: 'Forest Hills',
  hyper: 'Hyper',
  lightBlue: 'Bronx River',
  lightGreen: 'Gowanus',
  navy: 'Navy Yard',
  orange: 'Ferry',
  paleBlue: 'Piragua',
  paleGreen: 'Lenape',
  palePink: 'Lox',
  paleYellow: 'Dumpling',
  pink: 'Hotdog',
  red: 'Redhook',
  yellow: 'Taxi',
  black: 'Black',
  white: 'White',
} as const;

export const interactiveColors = {
  dark: colors.hyper,
  light: colors.yellow,
} as const;

export const editorColors = {
  blue: '#83fff5',
  deepPurple: '#cc7bc2',
  gray: '#939598',
  green: '#b4d353',
  orange: '#ff8973',
  purple: '#b3ccff',
  red: '#e85d7f',
  yellow: '#ffe083',
} as const;

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
