import { flattenObject } from '@codecademy/variance';

const black = '#000000';
const white = '#ffffff';

export const shadows = {
  blackShadow: 'rgba(0, 0, 0, 0.75)',
  whiteShadow: 'rgba(255, 255, 255, 0.95)',
} as const;

const coreSwatches = {
  beige: {
    '100': '#FFF0E5',
  },
  blue: {
    '0': '#F5FCFF',
    '300': '#66C4FF',
    '500': '#1557FF',
    '800': '#1D2340',
  },
  navy: {
    '800': '#10162F',
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
    '300': '#E85D7F',
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
    '100': '#F5F5F5',
    '200': '#EEEEEE',
    '300': '#E0E0E0',
    '600': '#9E9E9E',
    '800': '#616161',
    '900': '#424242',
  },
} as const;

export const trueColors = {
  beige: coreSwatches.beige[100],
  blue: coreSwatches.blue[500],
  green: coreSwatches.green[700],
  hyper: coreSwatches.hyper[500],
  lightBlue: coreSwatches.blue[300],
  lightGreen: coreSwatches.green[400],
  navy: coreSwatches.navy[800],
  orange: coreSwatches.orange[500],
  paleBlue: coreSwatches.blue[0],
  paleGreen: coreSwatches.green[0],
  palePink: coreSwatches.pink[0],
  paleYellow: coreSwatches.yellow[0],
  pink: coreSwatches.pink[400],
  paleRed: coreSwatches.red[300],
  red: coreSwatches.red[500],
  yellow: coreSwatches.yellow[500],
  black,
  white,
} as const;

export const corePalette = {
  ...flattenObject(coreSwatches),
  ...trueColors,
  ...shadows,
} as const;

const platformSwatches = {
  navy: {
    '300': '#585C6D',
    '600': '#232940',
    '900': '#0B0F21',
  },
  beige: {
    '0': '#FFFBF8',
  },
  gold: {
    '800': '#8A7300',
  },
  orange: {
    '800': '#D14900',
  },
  pink: {
    '800': '#CA00D1',
  },
  teal: {
    '500': '#027E97',
  },
  purple: {
    '300': '#B3CCFF',
  },
} as const;

const truePlatformColors = {
  lightBeige: platformSwatches.beige[0],
  gold: platformSwatches.gold[800],
  teal: platformSwatches.teal[500],
  purple: platformSwatches.purple[300],
} as const;

export const platformPalette = {
  ...flattenObject(platformSwatches),
  ...truePlatformColors,
} as const;
