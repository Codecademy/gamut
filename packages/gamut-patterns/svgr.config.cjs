const emotionPlugin = require('./emotion-plugin.cjs');
const template = require('./pattern-template.cjs');
const indexTemplate = require('./index-template.cjs');

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
