const emotionPlugin = require('./emotion-plugin.cjs');
const maskPlugin = require('./mask-plugin.cjs');
const template = require('./icon-template.cjs');
const indexTemplate = require('./index-template.cjs');

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
