function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';
var SvgProjectsIcon = React.forwardRef(function (_ref, svgRef) {
  var _ref$title = _ref.title,
      title = _ref$title === void 0 ? 'Projects Icon' : _ref$title,
      _ref$titleId = _ref.titleId,
      titleId = _ref$titleId === void 0 ? '' : _ref$titleId,
      size = _ref.size,
      color = _ref.color,
      width = _ref.width,
      height = _ref.height,
      props = _objectWithoutProperties(_ref, ["title", "titleId", "size", "color", "width", "height"]);

  titleId = 'gamut-icon-U3ZnUHJvamVjdHNJY29u' + titleId;
  return React.createElement("svg", _extends({
    viewBox: "0 0 32 32",
    width: size || width || '16px',
    height: size || height || '16px',
    fill: color || 'currentColor',
    role: "img",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? React.createElement("title", {
    id: titleId
  }, title) : null, React.createElement("path", {
    fill: color || 'currentColor',
    d: "M26.4 21.6L32 16l-7.2-7.2-1.2 1.4v2L22 13.8h-2.2l-1.6-1.6V10l1.6-1.6h2l1.4-1.2L19 3l-1.2 1.2 2.6 2.6h-1.2l-2.6 2.4v3.6l2.6 2.6h3.6l2.4-2.6v-1.2l4.4 4.4-5.8 6 1.2 1.2h2l1.6 1.6V27L27 28.6h-2.2L23.2 27v-2L22 23.8l-6 5.8-4.4-4.4h1.2l2.6-2.4v-3.6l-2.6-2.6H9.2l-2.4 2.6v1.2L2.4 16l5.8-6L7 8.8H5L3.4 7.2V5L5 3.4h2.2L8.8 5v2L10 8.2l7.2-7L16 0l-5.6 5.6V4.4L8 1.8H4.4L1.8 4.4V8l2.6 2.4h1.2L0 16l7.2 7.2 1.2-1.4v-2l1.6-1.6h2.2l1.6 1.6V22l-1.6 1.6h-2l-1.4 1.2L16 32l5.6-5.6v1.4l2.6 2.4h3.6l2.4-2.4v-3.6l-2.4-2.6z"
  }));
});
export default SvgProjectsIcon;