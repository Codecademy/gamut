import scssExports from './export.scss';

function convertSwatchStringToObject(swatchString) {
  return swatchString.split(' ').reduce((result, hexcode, index) => {
    result[`${index + 1}00`] = hexcode;
    return result;
  }, {});
}

// =======================================
//      03-01-2019 COLORS
// =======================================

export const colors2019 = {
  blue: convertSwatchStringToObject(scssExports.blue),
  pink: convertSwatchStringToObject(scssExports.pink),
  purple: convertSwatchStringToObject(scssExports.purple),
  red: convertSwatchStringToObject(scssExports.red),
  green: convertSwatchStringToObject(scssExports.green),
  yellow: convertSwatchStringToObject(scssExports.yellow),
  gray: convertSwatchStringToObject(scssExports.gray),
};

// =======================================
//       BRAND COLORS
// =======================================

export const brandColors = {
  red: scssExports.brandRed,
  yellow: scssExports.brandYellow,
  purple: scssExports.brandPurple,
  pink: scssExports.brandPink,
  mint: scssExports.brandMint,
  beige: scssExports.brandBeige,
  darkBlue: scssExports.brandDarkBlue,
};

// =======================================
//     11-27-2017 DESIGN SYSTEM COLORS
// =======================================

export const gamutColors = {
  base: {
    white: scssExports.gamutWhite,
    grey: scssExports.gamutGrey,
    black: scssExports.gamutBlack,
    purple: scssExports.gamutPurple,
    royalBlue: scssExports.gamutRoyalBlue,
    blue: scssExports.gamutBlue,
    red: scssExports.gamutRed,
    mint: scssExports.gamutMint,
    yellow: scssExports.gamutYellow,
  },
  swatches: {
    purple: convertSwatchStringToObject(scssExports.gamutPurpleSwatches),
    royalBlue: convertSwatchStringToObject(scssExports.gamutRoyalBlueSwatches),
    blue: convertSwatchStringToObject(scssExports.gamutBlueSwatches),
    red: convertSwatchStringToObject(scssExports.gamutRedSwatches),
    mint: convertSwatchStringToObject(scssExports.gamutMintSwatches),
    yellow: convertSwatchStringToObject(scssExports.gamutYellowSwatches),
    grey: convertSwatchStringToObject(scssExports.gamutGreySwatches),
  },
};

// =======================================
//       LEGACY COLORS
// =======================================

export const colors = {
  portal: {
    white: '#fff',
    black: '#000',
    blue: '#52b1db',
    darkblue: '#204056',
    midnightblue: '#152b39',
    mint: '#34b3a0',
    red: '#f65a5b',
    grey1: '#e9eaea',
    grey2: '#d4d5d6',
    grey3: '#bebfc1',
    grey4: '#939598',
    grey5: '#3e3e40',
  },
  swatches: {
    blue: {
      100: '#dceff8',
      200: '#bae0f1',
      300: '#97d0e9',
      400: '#75c1e2',
      500: '#52b1db',
      600: '#4292b4',
      700: '#32728d',
      800: '#215366',
      900: '#11333f',
    },
    ccBlue: {
      100: '#d3dde2',
      200: '#a7bbc6',
      300: '#7a98a9',
      400: '#4e768d',
      500: '#225470',
      600: '#214a63',
      700: '#204056',
      800: '#163142',
      900: '#0d222d',
    },
    greyBlue: {
      100: '#eef0f1',
      200: '#bcc1c5',
      300: '#9aa2a8',
      400: '#78838b',
      500: '#57646e',
      600: '#354551',
      700: '#253845',
      800: '#152b39',
      900: '#0b161d',
    },
    grey: {
      100: '#e9eaea',
      200: '#d4d5d6',
      300: '#bebfc1',
      400: '#a9aaad',
      500: '#939598',
      600: '#76787b',
      700: '#5a5b5e',
      800: '#3e3e40',
      900: '#212123',
    },
    mint: {
      100: '#d7f6f0',
      200: '#b0ede1',
      300: '#88e3d2',
      400: '#61dac3',
      500: '#39d1b4',
      600: '#37c2aa',
      700: '#34b3a0',
      800: '#1a7b72',
      900: '#044',
    },
    red: {
      100: '#fddede',
      200: '#fbbdbd',
      300: '#fa9c9d',
      400: '#f87b7c',
      500: '#f65a5b',
      600: '#c64748',
      700: '#963435',
      800: '#652022',
      900: '#350d0f',
    },
    yellow: {
      100: '#ffedd6',
      200: '#ffdbac',
      300: '#ffca83',
      400: '#ffb85a',
      500: '#fbb03b',
      600: '#c88b2e',
      700: '#956721',
      800: '#634213',
      900: '#301e06',
    },
  },
};

// =======================================
//       LEGACY-ER COLORS
// =======================================

export const editorColors = {
  black: '#000',
  white: '#fff',
  default: '#fff',
  atom: '#ff7155',
  attribute: '#ceff00',
  builtin: '#ddda6f',
  comment: '#737887',
  def: '#b5a1a1',
  error: '#e83131',
  keyword: '#64ffe1',
  meta: '#d478ea',
  number: '#ef9eb4',
  operator: '#b5a1a1',
  property: '#9771ff',
  qualifier: '#fff543',
  string1: '#ffde52',
  string2: '#ac99bf',
  tag: '#e85d7f',
  variable1: '#249cff',
  variable2: '#57ff93',
  variable3: '#5affef',
};

// =======================================
//        OTHER LEGACY VARIABLES
// =======================================

export const grid = {
  cols: 12,
  gutterWidth: '16px',
  outerMargin: '16px',
  xsMin: '480px',
  smMin: '768px',
  mdMin: '1024px',
  lgMin: '1200px',
};

export const legacyBreakpoints = {
  phone: '0',
  tablet: '736px',
  desktop: '960px',
};

// =======================================
//                EXPORT
// =======================================

export default {
  colors2019,
  colors,
  editorColors,
  grid,
  legacyBreakpoints,
};
