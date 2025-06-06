const emotionPlugin = require('./emotion-plugin');
const maskPlugin = require('./mask-plugin');
const strokeWidthPlugin = require('./stroke-width-plugin');
const template = require('./icon-template');
const indexTemplate = require('./index-template');

module.exports = {
  dimensions: false,
  titleProp: true,
  ref: true,
  svgProps: {
    fill: '#fff',
    role: 'img',
    'aria-hidden': 'true',
    'pointer-events': 'none',
    width: '{width}',
    height: '{height}',
    strokeWidth: '{strokeWidth}',
  },
  prettierConfig: {
    parser: 'typescript',
  },
  replaceAttrValues: {
    '#000': '#fff',
    '#111': '#fff',
    '#444': '#fff',
    currentColor: '#fff',
  },
  jsx: {
    babelConfig: {
      plugins: [maskPlugin, emotionPlugin, strokeWidthPlugin],
    },
  },
  indexTemplate,
  template,
};
