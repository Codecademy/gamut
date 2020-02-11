function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';
var SvgFaviconIcon = React.forwardRef(function (_ref, svgRef) {
  var _ref$title = _ref.title,
      title = _ref$title === void 0 ? 'Favicon Icon' : _ref$title,
      _ref$titleId = _ref.titleId,
      titleId = _ref$titleId === void 0 ? '' : _ref$titleId,
      size = _ref.size,
      color = _ref.color,
      width = _ref.width,
      height = _ref.height,
      props = _objectWithoutProperties(_ref, ["title", "titleId", "size", "color", "width", "height"]);

  titleId = 'gamut-icon-U3ZnRmF2aWNvbkljb24=' + titleId;
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
    d: "M5.6 6.4c.4 0 .7.2 1 .5 0 .1.1.1.2 0l.7-.6c.1 0 0-.1 0-.2-.5-.5-1.1-.8-1.9-.8-1.1 0-1.9.5-2.2 1.5 0 .3-.1.7-.1 1.3s.1 1 .2 1.3c.3.9 1.1 1.5 2.2 1.5.8 0 1.4-.3 1.8-.8v-.2l-.7-.6h-.2c-.3.3-.5.5-1 .5s-.8-.2-1-.7c-.1-.3-.1-.6-.1-1s0-.7.1-1c.2-.4.6-.7 1-.7zm10.3 6.8h-3.7c-.1 0-.1 0-.1.1v1c0 .1 0 .1.1.1h3.7c.1 0 .1 0 .1-.1v-1c0-.1 0-.1-.1-.1z"
  }), React.createElement("path", {
    fill: color || 'currentColor',
    d: "M11 1.7c-.1-.1-.1-.1 0 0H.1c-.1-.1-.1 0-.1 0v12.6h11V1.7zM9.8 13c0 .1-.1.1 0 0l-.1.1H1.3l-.1-.1V3s0-.1.1-.1h8.3l.1.1v10z"
  }));
});
export default SvgFaviconIcon;