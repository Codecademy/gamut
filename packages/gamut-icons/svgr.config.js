const template = require('./icon-template');
const indexTemplate = require('./index-template');

module.exports = {
  dimensions: false,
  titleProp: true,
  ref: true,
  svgProps: {
    width: '{size || getAttrValue(width) || "16px"}',
    height: '{size || getAttrValue(height) || "16px"}',
    fill: '{color || "currentColor"}',
    role: 'img',
  },
  prettierConfig: {
    parser: 'typescript',
  },
  replaceAttrValues: {
    currentColor: '{color || "currentColor"}',
    '#000': '{color || "currentColor"}',
    '#111': '{color || "currentColor"}',
    '#444': '{color || "currentColor"}',
  },
  template,
  indexTemplate,
};
