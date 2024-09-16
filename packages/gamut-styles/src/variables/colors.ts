import { flattenScale } from '@codecademy/variance';
import { rgba } from 'polished';
/**
 * Core Colors
 */

const black = '#000000';
const white = '#ffffff';
const navy = '#10162F';

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
  },
  blue: {
    '0': '#F5FCFF',
    '100': '#D3F2FF',
    '300': '#66C4FF',
    '400': '#3388FF',
    '500': '#1557FF',
    '800': '#1D2340',
  },
  navy: {
    '100': rgba(navy, 0.04),
    '200': rgba(navy, 0.12),
    '300': rgba(navy, 0.28),
    '400': rgba(navy, 0.45),
    '500': rgba(navy, 0.63),
    '600': rgba(navy, 0.75),
    '700': rgba(navy, 0.86),
    '800': navy,
    '900': '#0A0D1C',
  },
  green: {
    '0': '#F5FFE3',
    '100': '#EAFDC6',
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
  white: {
    '100': rgba(white, 0.04),
    '200': rgba(white, 0.09),
    '300': rgba(white, 0.2),
    '400': rgba(white, 0.33),
    '500': rgba(white, 0.5),
    '600': rgba(white, 0.65),
    '700': rgba(white, 0.8),
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

/**
 * Enterprise Colors
 */

const enterpriseBlack = '#000C14';

export const enterpriseSwatches = {
  blue: {
    '50': '#F0F8FE',
    '100': '#E0F2FE',
    '200': '#B7DDF8',
    '300': '#78BAE9',
    '400': '#3498DF',
    '500': '#0073C4',
    '600': '#005998',
    '700': '#00406C',
    '800': '#002640',
    '900': '#001626',
  },
  gray: {
    '50': '#F3F5F7',
    '100': '#E1E6EA',
    '200': '#CAD4DC',
    '300': '#AAB8C1',
    '400': '#80919C',
    '500': '#6B7B85',
    '600': '#56646E',
    '700': '#404E58',
    '800': '#2B3841',
    '900': '#15222B',
  },
  skyBlue: {
    '100': '#E6FAFF',
    '500': '#21B9E8',
  },
  green: {
    '0': '#EBF6E4',
    '400': '#6EAB49',
    '500': '#42811A',
    '700': '#1D4C12',
  },
  pink: {
    '100': '#FEE7F2',
    '400': '#DF659E',
    '500': '#CD397E',
  },
  yellow: {
    '0': '#FEFAE8',
    '500': '#E8C427',
  },
  orange: {
    '500': '#F2A036',
  },
  red: {
    '0': '#FBE8E8',
    '100': '#F4C7C7',
    '500': '#BE3636',
    '600': '#932729',
  },
} as const;

const trueEnterpriseColors = {
  mulberryPink: enterpriseSwatches.pink[500],
  blue: enterpriseSwatches.blue[400],
  green: enterpriseSwatches.green[500],
  skyBlue: enterpriseSwatches.skyBlue[500],
  yellow: enterpriseSwatches.yellow[500],
  red: enterpriseSwatches.red[500],
  gray: enterpriseSwatches.gray[500],
  black: enterpriseBlack,
} as const;

export const enterprisePalette = {
  ...flattenScale(enterpriseSwatches),
  ...trueEnterpriseColors,
} as const;
