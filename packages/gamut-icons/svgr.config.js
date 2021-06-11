const template = require('./icon-template');
const indexTemplate = require('./index-template');

module.exports = {
  dimensions: false,
  titleProp: true,
  ref: true,
  svgProps: {
    className: '{classNames}',
    width: '{size || getAttrValue(width) || "16px"}',
    height: '{size || getAttrValue(height) || "16px"}',
    fill: 'currentColor',
    role: 'img',
  },
  prettierConfig: {
    parser: 'typescript',
  },
  replaceAttrValues: {
    currentColor: 'currentColor',
    '#000': 'currentColor',
    '#111': 'currentColor',
    '#444': 'currentColor',
  },
  template,
  indexTemplate,
};
