function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';
var SvgForkIcon = React.forwardRef(function (_ref, svgRef) {
  var _ref$title = _ref.title,
      title = _ref$title === void 0 ? 'Fork Icon' : _ref$title,
      _ref$titleId = _ref.titleId,
      titleId = _ref$titleId === void 0 ? '' : _ref$titleId,
      size = _ref.size,
      color = _ref.color,
      width = _ref.width,
      height = _ref.height,
      props = _objectWithoutProperties(_ref, ["title", "titleId", "size", "color", "width", "height"]);

  titleId = 'gamut-icon-U3ZnRm9ya0ljb24=' + titleId;
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
    d: "M15.8 12.1l-3.6-3.3c-.2 0-.2-.1-.2-.1-.1 0-.2 0-.3.1v2.3h-.4c-.5 0-.9-.2-1.2-.5L5.5 6c-.8-.9-2-1.3-3.2-1.3h-2c-.1 0-.2.1-.2.3v2c0 .2.1.3.2.3h2c.5 0 1 .2 1.4.6l4.5 4.6c.8.8 1.8 1.2 3 1.3h.5v2.3c.1.1.2.1.3 0 0 0 .1 0 .2-.1l3.6-3.3c.1-.3.1-.4 0-.6zm0-8.7L12.2.1 12 0h-.3v2.3h-.5c-1.1 0-2.2.5-3 1.3l-.8 1c-.1.1-.1.2 0 .3l1.4 1.5c.1.1.2.1.3 0l.9-.9c.3-.3.8-.5 1.2-.6h.4v2.3c.1.1.2.1.3 0 0 0 .1 0 .2-.1l3.6-3.3c.2-.1.2-.2.1-.4z"
  }));
});
export default SvgForkIcon;