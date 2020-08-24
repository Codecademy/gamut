export const swatches = {
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
} as const;

const black = '#000000';
const white = '#ffffff';

const legacyColors = {
  royalBlue: '#6400e4',
} as const;

export const standardColors = {
  beige: '#FFF0E5',
  blue: '#66C4FF',
  darkBlue: '#1557FF',
  darkGreen: '#009C2C',
  green: '#AEE938',
  hyper: '#3A10E5',
  navy: swatches.blue[1000],
  orange: '#FF8C00',
  pink: '#F966FF',
  red: '#F03329',
  yellow: '#FFD300',
  paleBlue: '#F5FCFF',
  paleGreen: '#F5FFE3',
  palePink: '#FFF5FF',
  paleYellow: '#FFFAE5',
} as const;

export const standardColorNames = {
  beige: 'Bagel',
  blue: 'Bronx River',
  darkBlue: 'A Train',
  darkGreen: 'Forest Hills',
  green: 'Gowanus',
  hyper: 'Hyper',
  navy: 'Navy Yard',
  orange: 'Ferry',
  pink: 'Hot Dog',
  red: 'Redhook',
  yellow: 'Taxi',
  paleBlue: 'Piragua',
  paleGreen: 'Lenape',
  palePink: 'Lox',
  paleYellow: 'Dumpling',
} as const;

const interactive = {
  dark: standardColors.hyper,
  light: standardColors.yellow,
} as const;

/**
 * @deprecated
 * use standard color set
 */
export const brandColors = {
  red: swatches.red[500],
  orange: swatches.orange[400],
  yellow: swatches.yellow[500],
  purple: legacyColors['royalBlue'],
  pink: swatches.pink[400],
  magenta: swatches.pink[700],
  mint: swatches.green[300],
  beige: '#efd9ca',
  blue: swatches.blue[500],
  darkBlue: swatches.blue[900],
  lavender: swatches.purple[500],
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

export const colors = {
  ...legacyColors,
  ...swatches,
  ...standardColors,
  black,
  editor: editorColors,
  interactive,
  platform: platformColors,
  white,
} as const;
