function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';
var SvgLinkIcon = React.forwardRef(function (_ref, svgRef) {
  var _ref$title = _ref.title,
      title = _ref$title === void 0 ? 'Link Icon' : _ref$title,
      _ref$titleId = _ref.titleId,
      titleId = _ref$titleId === void 0 ? '' : _ref$titleId,
      size = _ref.size,
      color = _ref.color,
      width = _ref.width,
      height = _ref.height,
      props = _objectWithoutProperties(_ref, ["title", "titleId", "size", "color", "width", "height"]);

  titleId = 'gamut-icon-U3ZnTGlua0ljb24=' + titleId;
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
    d: "M9 10.9c-.1-.1-.3-.1-.4 0l-2.3 2.3-3.4-3.6 2.3-2.3c.1-.1.1-.3 0-.4L4 5.9c-.1-.1-.3-.1-.4 0L.1 9.4c-.1.1-.1.3 0 .4l6.1 6.1c.1.1.3.1.4 0l3.6-3.6c.1-.1.1-.2 0-.3L9 10.9zM6.7 5.4c.1.1.3.1.4 0l2.5-2.5 3.5 3.5-2.5 2.5c-.1.1-.1.3 0 .4l1.1 1.1c.1.1.3.1.4 0L16 6.5c.1-.1.1-.3 0-.4L9.8.1c-.1-.1-.3-.1-.4 0L5.6 3.9c-.1.1-.1.3 0 .4l1.1 1.1z"
  }), React.createElement("path", {
    fill: color || 'currentColor',
    d: "M10.2 7.3c.1-.1.1-.2 0-.4L9.1 5.8c-.1-.1-.3-.1-.4 0L5.8 8.7c-.1.1-.1.3 0 .4l1.1 1.1c.1.1.3.1.4 0l2.9-2.9z"
  }));
});
export default SvgLinkIcon;