const template = require('./icon-template');

module.exports = {
  icon: true,
  // expandProps: true,
  dimensions: false,
  svgProps: {
    width: '{props.size || props.width || 16}',
    height: '{props.size || props.height || 16}',
    fill: '{props.color || "currentColor"}',
  },
  replaceAttrValues: {
    '#000': '{props.color || "currentColor"}',
    '#444': '{props.color || "currentColor"}',
  },
  template,
};
