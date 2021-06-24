const emotionPlugin = require('./emotion-plugin');
const template = require('./icon-template');
const indexTemplate = require('./index-template');

module.exports = {
  dimensions: false,
  titleProp: true,
  ref: true,
  svgProps: {
    fill: 'currentColor',
    role: 'img',
    'aria-hidden': 'true',
  },
  prettierConfig: {
    parser: 'typescript',
  },
  replaceAttrValues: {
    '#000': 'currentColor',
    '#111': 'currentColor',
    '#444': 'currentColor',
  },
  jsx: {
    babelConfig: {
      plugins: [emotionPlugin],
    },
  },
  indexTemplate,
  template,
};
