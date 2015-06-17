
var base = require('./base');

var shared = {
  bgDark: '#152b39',
  moduleBgDark: '#354551'
};

var lpColors = {
  lp: {
    'bg-dark': shared.bgDark,
    'bg-light': base.white,
    'module-bg-light': base.grey1,
    'module-bg-dark': shared.moduleBgDark,
    'button-bg': '#DEE3E6',
    'editor-bg': shared.moduleBgDark,
    'chrome-bg-light': '#C3C8CB',
    'chrome-bg-tabs-light': '#2A3034',
    'chrome-bg-dark': '#2A3034',
    'chrome-bg-tabs-dark': '#4A4F52',
    'chrome-bg-tabs-dark--hover': '#5F6467',
    'font-dark': '#204056',
    'filetree-icon': '#fbb03b',
    'button-everyday': shared.bgDark,
    'button-everyday--hover': '#5A6A73',
    'overlay-bg': shared.bgDark,
    'overlay-bg-opacity': 0.9
  }
};


module.exports = lpColors;
