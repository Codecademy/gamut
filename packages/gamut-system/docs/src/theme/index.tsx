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
    '700': '#009C2C',
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
    '500': '#F03329',
  },
  orange: {
    '500': '#FF8C00',
  },
  hyper: {
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

export const theme = {
  fontSize: {
    1: 14,
    2: 16,
    3: 18,
    4: 20,
    5: 25,
    6: 31,
    7: 39,
    8: 49,
    9: 64,
  },
  fontFamily: {
    accent: `"Suisse", "Apercu", -apple-system, BlinkMacSystemFont,
    "Segoe UI", "Roboto", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif`,
    base: `"Apercu", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif`,
    monospace: `Monaco, Menlo, "Ubuntu Mono", "Droid Sans Mono", Consolas,
    monospace`,
    system: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Ubuntu",
    "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
  },
  fontWeight: {
    base: 400,
    heading: 700,
  },
  lineHeight: {
    base: 1.5,
    heading: 1.1,
  },
  radii: {
    none: 0,
    sm: 2,
    md: 4,
    lg: 8,
  },
  lineWidths: [0, 1, 2],
  space: {
    0: 0,
    4: 4,
    8: 8,
    12: 12,
    16: 16,
    24: 24,
    32: 32,
    48: 48,
    64: 64,
  },
  color: {
    beige: swatches.beige['0'],
    blue: swatches.blue[500],
    green: swatches.green[700],
    hyper: swatches.hyper[500],
    lightBlue: swatches.blue[300],
    lightGreen: swatches.green[400],
    navy: swatches.blue[900],
    orange: swatches.orange[500],
    paleBlue: swatches.blue['0'],
    paleGreen: swatches.green['0'],
    palePink: swatches.pink['0'],
    paleYellow: swatches.yellow['0'],
    pink: swatches.pink[400],
    red: swatches.red[500],
    yellow: swatches.yellow[500],
    black,
    white,
  },
} as const;

export type DynamicTheme = {
  backgroundColor: {
    primary?: string;
    secondary?: string;
    accent?: string;
    contrast?: string;
  };
  textColor?: {
    primary?: string;
    secondary?: string;
    accent?: string;
    contrast?: string;
  };
};

export type Theme = typeof theme & DynamicTheme;
