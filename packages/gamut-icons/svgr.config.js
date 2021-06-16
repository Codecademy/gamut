const template = require('./icon-template');
const indexTemplate = require('./index-template');

module.exports = {
  dimensions: false,
  titleProp: true,
  ref: true,
  svgProps: {
    className: '{classNames}',
    width: '{size || "16px"}',
    height: '{size || "16px"}',
    fill: 'currentColor',
    role: 'img',
  },
  prettierConfig: {
    parser: 'typescript',
  },
  replaceAttrValues: {
    '#000': 'currentColor',
    '#111': 'currentColor',
    '#444': 'currentColor',
  },
  template,
  indexTemplate,
};
