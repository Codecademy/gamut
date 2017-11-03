const colors = {
  portal: {
    white: '#FFFFFF',
    black: '#000000',
    grey1: '#E9EAEA',
    grey2: '#D4D5D6',
    grey3: '#BEBFC1',
    grey4: '#939598',
    grey5: '#3E3E40',
    blue: '#52B1DB',
    darkblue: '#204056',
    midnightblue: '#152B39',
    mint: '#34B3A0',
    red: '#F65A5B'
  },
  swatches: {
    blue: {
      100: '#DCEFF8',
      200: '#BAE0F1',
      300: '#97D0E9',
      400: '#75C1E2',
      500: '#52B1DB',
      600: '#4292B4',
      700: '#32728D',
      800: '#215366',
      900: '#11333F'
    },
    ccBlue: {
      100: '#D3DDE2',
      200: '#A7BBC6',
      300: '#7A98A9',
      400: '#4E768D',
      500: '#225470',
      600: '#214A63',
      700: '#204056',
      800: '#163142',
      900: '#0D222D'
    },
    greyBlue: {
      100: '#EEF0F1',
      200: '#BCC1C5',
      300: '#9AA2A8',
      400: '#78838B',
      500: '#57646E',
      600: '#354551',
      700: '#253845',
      800: '#152B39',
      900: '#0B161D'
    },
    grey: {
      100: '#E9EAEA',
      200: '#D4D5D6',
      300: '#BEBFC1',
      400: '#A9AAAD',
      500: '#939598',
      600: '#76787B',
      700: '#5A5B5E',
      800: '#3E3E40',
      900: '#212123'
    },
    mint: {
      100: '#D7F6F0',
      200: '#B0EDE1',
      300: '#88E3D2',
      400: '#61DAC3',
      500: '#39D1B4',
      600: '#37C2AA',
      700: '#34B3A0',
      800: '#1A7B72',
      900: '#004444'
    },
    red: {
      100: '#FDDEDE',
      200: '#FBBDBD',
      300: '#FA9C9D',
      400: '#F87B7C',
      500: '#F65A5B',
      600: '#C64748',
      700: '#963435',
      800: '#652022',
      900: '#350D0F'
    },
    yellow: {
      100: '#FFEDD6',
      200: '#FFDBAC',
      300: '#FFCA83',
      400: '#FFB85A',
      500: '#FBB03B',
      600: '#C88B2E',
      700: '#956721',
      800: '#634213',
      900: '#301E06'
    }
  },
  platform: {
    black: '#000000',
    white: '#FFFFFF',
    default: '#FFFFFF',
    atom: '#FF7155',
    attribute: '#CEFF00',
    builtin: '#DDDA6F',
    comment: '#737887',
    def: '#B5A1A1',
    error: '#E83131',
    keyword: '#64FFE1',
    meta: '#D478EA',
    number: '#EF9EB4',
    operator: '#B5A1A1',
    property: '#9771FF',
    qualifier: '#FFF543',
    string1: '#FFDE52',
    string2: '#AC99BF',
    tag: '#E85D7F',
    variable1: '#249CFF',
    variable2: '#57FF93',
    variable3: '#5AFFEF'
  }
};

const grid = {
  cols: 12,
  gutterWidth: '16px',
  outerMargin: '16px',
  xsMin: '480px',
  smMin: '768px',
  mdMin: '1024px',
  lgMin: '1200px'
};

const legacyBreakpoints = {
  phone: '0',
  tablet: '736px',
  desktop: '960px'
};

export default {
  colors,
  grid,
  legacyBreakpoints
};
