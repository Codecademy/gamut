
var base = require('./base');

var shared = {
  bgDark: '#152b39',
  moduleBgDark: '#354551'
};

var lpColors = {
  lp: {
    bgDark: shared.bgDark,
    bgLight: base.white,
    moduleBgLight: base.grey1,
    moduleBgDark: shared.moduleBgDark,
    buttonBg: '#DEE3E6',
    editorBg: shared.moduleBgDark,
    chromeBgLight: base.grey2,
    chromeBgTabsLight: '#C3C8CB',
    chromeBgDark: '#2A3034',
    chromeBgTabsDark: '#4A4F52',
    chromeBgTabsDarkHover: '#5F6467',
    fontDark: '#204056',
    filetreeIcon: '#fbb03b',
    buttonEveryday: shared.bgDark,
    buttonEverydayHover: '#5A6A73',
    overlayBg: shared.bgDark,
    overlayBgOpacity: 0.9
  }
};


module.exports = lpColors;
