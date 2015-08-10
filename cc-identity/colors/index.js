
// Base colors
var colors = {
  white: '#FFFFFF',
  black: '#000000',
  grey1: '#F1F2F2',
  grey2: '#E6E7E8',
  grey3: '#BCBEC0',
  grey4: '#939598',
  grey5: '#4a4a4c',
  blue: '#59A1C9',
  darkblue: '#204056',
  mint: '#34B3A0',
  red: '#F65A5B'
};


// LP colors (formerly fcn)

var lpShared = {
  bgDark: '#152b39',
  moduleBgDark: '#354551'
};

colors.lp = {
  bgDark: lpShared.bgDark,
  bgLight: colors.white,
  moduleBgLight: colors.grey1,
  moduleBgDark: lpShared.moduleBgDark,
  buttonBg: '#DEE3E6',
  editorBg: lpShared.moduleBgDark,
  chromeBgLight: colors.grey2,
  chromeBgTabsLight: '#C3C8CB',
  chromeBgDark: '#2A3034',
  chromeBgTabsDark: '#4A4F52',
  chromeBgTabsDarkHover: '#5F6467',
  fontDark: '#204056',
  filetreeIcon: '#fbb03b',
  buttonEveryday: lpShared.bgDark,
  buttonEverydayHover: '#5A6A73',
  overlayBg: lpShared.bgDark,
  overlayBgOpacity: 0.8
};

module.exports = colors;
