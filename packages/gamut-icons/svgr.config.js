const emotionPlugin = require('./emotion-plugin');
const maskPlugin = require('./mask-plugin');
const template = require('./icon-template');
const indexTemplate = require('./index-template');

module.exports = {
  dimensions: false,
  titleProp: true,
  ref: true,
  svgProps: {
    role: 'img',
    'aria-hidden': 'true',
    width: '{width}',
    height: '{height}',
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
      plugins: [maskPlugin, emotionPlugin],
    },
  },
  indexTemplate,
  template,
};
