import { flattenScale } from '@codecademy/variance';
import { rgba } from 'polished';
/**
 * Core Colors
 */

const black = '#000000';
const white = '#ffffff';

const effects = {
  shadow: {
    black: {
      slight: rgba(black, 0.15),
      heavy: rgba(black, 0.75),
    },
    white: {
      slight: rgba(white, 0.15),
      heavy: rgba(white, 0.95),
    },
  },
};

export const coreSwatches = {
  beige: {
    '100': '#FFF0E5',
    '400': '#B2A8A0',
  },
  blue: {
    '0': '#F5FCFF',
    '300': '#66C4FF',
    '400': '#3388FF',
    '500': '#1557FF',
    '800': '#1D2340',
  },
  navy: {
    '100': '#F3F3F5',
    '200': '#DBDCE0',
    '300': '#C3C5CB',
    '400': '#9FA2AC',
    '500': '#707382',
    '600': '#585C6D',
    '700': '#34394C',
    '800': '#10162F',
    '900': '#0A0D1C',
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
    '0': '#E85D7F',
    '100': '#DC5879',
    '500': '#E91C11',
    '600': '#BE1809',
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
  paleRed: coreSwatches.red[100],
  red: coreSwatches.red[500],
  yellow: coreSwatches.yellow[500],
  black,
  white,
} as const;

export const corePalette = {
  ...flattenScale(coreSwatches),
  ...flattenScale(effects),
  ...trueColors,
} as const;

/**
 * Platform Colors
 */

export const platformSwatches = {
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
  ...flattenScale(platformSwatches),
  ...truePlatformColors,
} as const;
