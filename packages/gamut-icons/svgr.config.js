const template = require('./icon-template');

module.exports = {
  icon: true,
  dimensions: false,
  svgProps: {
    width: '{props.size || props.width || "1em"}',
    height: '{props.size || props.height || "1em"}',
    fill: '{props.color || "currentColor"}',
  },
  replaceAttrValues: {
    '#000': '{props.color || "currentColor"}',
    '#444': '{props.color || "currentColor"}',
  },
  template,
};
