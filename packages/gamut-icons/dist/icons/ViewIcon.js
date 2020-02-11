function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';
var SvgViewIcon = React.forwardRef(function (_ref, svgRef) {
  var _ref$title = _ref.title,
      title = _ref$title === void 0 ? 'View Icon' : _ref$title,
      _ref$titleId = _ref.titleId,
      titleId = _ref$titleId === void 0 ? '' : _ref$titleId,
      size = _ref.size,
      color = _ref.color,
      width = _ref.width,
      height = _ref.height,
      props = _objectWithoutProperties(_ref, ["title", "titleId", "size", "color", "width", "height"]);

  titleId = 'gamut-icon-U3ZnVmlld0ljb24=' + titleId;
  return React.createElement("svg", _extends({
    viewBox: "0 0 16 16",
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
    d: "M8 12.4c-3.5 0-5.2-3.3-6.1-4.4.9-1.1 2.6-4.4 6.1-4.4s5.2 3.3 6.1 4.4c-.9 1.1-2.6 4.4-6.1 4.4zm7.8-5.5h-.7C13.9 5.5 12 2.1 8 2.1S2.1 5.5.8 7H.2c-.1-.1-.2 0-.2.1v1.8c0 .1.1.2.2.2h.7C2.1 10.5 4 13.9 8 13.9s5.9-3.4 7.2-4.9h.7c0 .1.1 0 .1-.1V7.1c0-.1-.1-.2-.2-.2z"
  }), React.createElement("path", {
    fill: color || 'currentColor',
    d: "M10.4 8c0 1.3-1.1 2.4-2.4 2.4S5.6 9.3 5.6 8c0-1.3 1.1-2.4 2.4-2.4s2.4 1.1 2.4 2.4z"
  }));
});
export default SvgViewIcon;