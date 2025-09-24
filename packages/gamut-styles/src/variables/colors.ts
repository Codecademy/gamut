import { flattenScale } from '@codecademy/variance';
import { rgba } from 'polished';
/**
 * Core Colors
 */

const black = '#000000';
const white = '#ffffff';
const navy = '#10162F';

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
    '400': rgba(navy, 0.47),
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
    '900': '#151C07',
  },
  yellow: {
    '0': '#FFFAE5',
    '400': '#CCA900',
    '500': '#FFD300',
    '900': '#211B00',
  },
  pink: {
    '0': '#FFF5FF',
    '400': '#F966FF',
  },
  red: {
    '0': '#FBF1F0',
    '300': '#E85D7F',
    '400': '#DC5879',
    '500': '#E91C11',
    '600': '#BE1809',
    '900': '#280503',
  },
  orange: {
    '100': '#FFE8CC',
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
    '400': rgba(white, 0.35),
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
  paleRed: coreSwatches.red[400],
  red: coreSwatches.red[500],
  yellow: coreSwatches.yellow[500],
  black,
  white,
} as const;

export const corePalette = {
  ...flattenScale(coreSwatches),
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
    '500': '#006D82',
  },
  purple: {
    '300': '#B3CCFF',
  },
} as const;

export const truePlatformColors = {
  lightBeige: platformSwatches.beige[0],
  gold: platformSwatches.gold[800],
  teal: platformSwatches.teal[500],
  purple: platformSwatches.purple[300],
} as const;

export const platformEditorColors = {
  'comment-light': '#686C7B',
  'comment-dark': '#84868D',
  'indent-active-light': '#BCBDC4',
  'indent-active-dark': '#3B3D49',
  'indent-inactive-light': '#8E919D',
  'indent-inactive-dark': '#5F616B',
  'line-number-active-light': '#31374C',
  'line-number-active-dark': '#CECFD2',
  'line-number-inactive-light': '#686C7B',
  'line-number-inactive-dark': '#84868D',
} as const;

export const platformPalette = {
  ...flattenScale(platformSwatches),
  ...platformEditorColors,
  ...truePlatformColors,
} as const;

/**
 * LX Studio Colors
 */

export const lxStudioColors = {
  lxStudioSuccess: '#06844F',
  lxStudioBgPrimary: '#FAFBFC',
  lxStudioPurple: '#5628FE',
  lxStudioPurpleHover: '#7955FC',
} as const;

export const lxStudioPalette = {
  ...corePalette,
  ...lxStudioColors,
};
