export const colors = {
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
  black: '#000000',
  white: '#ffffff',
  beige: '#efd9ca',
  royalBlue: '#6400e4',
};

export const brandColors = {
  red: colors.red[500],
  orange: colors.orange[400],
  yellow: colors.yellow[500],
  purple: colors['royalBlue'],
  pink: colors.pink[400],
  magenta: colors.pink[700],
  mint: colors.green[300],
  beige: colors['beige'],
  blue: colors.blue[500],
  darkBlue: colors.blue[900],
  lavender: colors.purple[500],
};

export const effectColors = {
  slightShadow: 'rgba(0, 0, 0, 0.15)',
};

export const editorColors = {
  blue: '#83fff5',
  deepPurple: '#cc7bc2',
  gray: '#939598',
  green: '#b4d353',
  orange: '#ff8973',
  purple: '#b3ccff',
  red: '#e85d7f',
  yellow: '#ffe083',
};

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
};

export const grid = {
  cols: 12,
  gutterWidth: '16px',
  outerMargin: '16px',
  maxContentWidth: '1440px',
  xsMin: '480px',
  smMin: '768px',
  mdMin: '1024px',
  lgMin: '1200px',
  xlMin: '1440px',
};

export const legacyBreakpoints = {
  phone: '0',
  tablet: '736px',
  desktop: '960px',
};

export const breakpoints = {
  xs: '480px',
  sm: '768px',
  md: '1024px',
  lg: '1200px',
  xl: '1440px',
};

export default {
  colors,
  brandColors,
  editorColors,
  effectColors,
  grid,
  breakpoints,
  legacyBreakpoints,
  platformColors,
};
