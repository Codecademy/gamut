const black = '#000000';
const white = '#ffffff';

export const swatches = {
  beige: {
    '0': '#FFF0E5',
  },
  blue: {
    '0': '#F5FCFF',
    '300': '#66C4FF',
    '500': '#1557FF',
    '900': '#10162f',
  },
  green: {
    '0': '#F5FFE3',
    '400': '#AEE938',
    '700': '#008A27',
  },
  yellow: {
    '0': '#FFFAE5',
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

const flatSwatches = {
  'beige-0': '#FFF0E5',
  'blue-0': '#F5FCFF',
  'blue-300': '#66C4FF',
  'blue-500': '#1557FF',
  'blue-900': '#10162f',
  'green-0': '#F5FFE3',
  'green-400': '#AEE938',
  'green-700': '#008A27',
  'yellow-0': '#FFFAE5',
  'yellow-500': '#FFD300',
  'pink-0': '#FFF5FF',
  'pink-400': '#F966FF',
  'red-500': '#E91C11',
  'orange-500': '#FF8C00',
  'hyper-400': '#5533FF',
  'hyper-500': '#3A10E5',
  'gray-0': '#ffffff',
  'gray-100': '#f6f5fa',
  'gray-200': '#dddce0',
  'gray-300': '#c4c3c7',
  'gray-400': '#a2a2a6',
  'gray-500': '#828285',
  'gray-600': '#646466',
  'gray-700': '#4b4b4d',
  'gray-800': '#323233',
  'gray-900': '#19191a',
} as const;

export const colors = {
  ...flatSwatches,
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
