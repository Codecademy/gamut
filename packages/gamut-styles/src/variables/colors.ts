const black = '#000000';
const white = '#ffffff';

/**
 * @deprecated
 */

export const swatches = {
  beige: {
    '0': '#FFFBF8',
    '200': '#FFF0E5',
  },
  blue: {
    '0': '#F5FCFF',
    '300': '#66C4FF',
    '500': '#1557FF',
    '800': '#1D2340',
    '900': '#10162f',
  },
  navy: {
    '300': '#585C6D',
    '600': '#232940',
    '800': '#10162F',
    '900': '#0B0F21',
  },
  gold: {
    '400': `#8A7300`,
  },
  teal: {
    '600': '#027E97',
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
    '600': '#CA00D1',
  },
  red: {
    '500': '#E91C11',
    '600': '#F03329',
  },
  orange: {
    '500': '#FF8C00',
    '700': '#D14900',
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

export const flatSwatches = {
  'beige-0': '#FFF0E5',
  'blue-0': '#F5FCFF',
  'blue-300': '#66C4FF',
  'blue-500': '#1557FF',
  'blue-800': '#1D2340',
  'blue-900': '#10162f',
  'green-0': '#F5FFE3',
  'green-400': '#AEE938',
  'green-700': '#008A27',
  'yellow-0': '#FFFAE5',
  'yellow-400': '#CCA900',
  'yellow-500': '#FFD300',
  'pink-0': '#FFF5FF',
  'pink-400': '#F966FF',
  'red-500': '#E91C11',
  'orange-500': '#FF8C00',
  'hyper-400': '#5533FF',
  'hyper-500': '#3A10E5',
  'gray-0': '#ffffff',
  'gray-100': '#f6f5fa',
  'gray-200': '#EEEEEE',
  'gray-300': '#E0E0E0',
  'gray-400': '#a2a2a6',
  'gray-500': '#828285',
  'gray-600': '#9E9E9E',
  'gray-800': '#616161',
  'gray-900': '#424242',
} as const;

export const trueColors = {
  beige: swatches.beige[200],
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

export const colors = {
  ...flatSwatches,
  ...trueColors,
} as const;

export const platform = {
  ...colors,
  beige: swatches.beige[0],
  'navy-300': swatches.navy[300],
  'navy-600': swatches.navy[600],
  'navy-900': swatches.navy[900],
};

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

/**
 * @deprecated
 */

export const interactiveColors = {
  dark: colors.hyper,
  light: colors.yellow,
} as const;

export const editorColors = {
  blue: colors['blue-300'],
  pink: colors.pink,
  gray: '#939598',
  green: colors.lightGreen,
  orange: colors.orange,
  purple: '#b3ccff',
  red: '#E85D7F',
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

export const shroudColor = {
  dark: 'rgba(0,0,0, .75)',
  light: 'rgba(255, 255, 255, 0.95)',
} as const;

export const colorModes = {
  light: {
    background: colors.white,
    text: colors.navy,
    primary: colors.hyper,
    secondary: colors.navy,
    shadow: shroudColor.light,
  },
  dark: {
    background: colors.navy,
    text: colors.white,
    primary: colors.yellow,
    secondary: colors.white,
    shadow: shroudColor.dark,
  },
};
