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
  template,
  indexTemplate,
};
