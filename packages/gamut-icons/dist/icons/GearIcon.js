function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';
var SvgGearIcon = React.forwardRef(function (_ref, svgRef) {
  var _ref$title = _ref.title,
      title = _ref$title === void 0 ? 'Gear Icon' : _ref$title,
      _ref$titleId = _ref.titleId,
      titleId = _ref$titleId === void 0 ? '' : _ref$titleId,
      size = _ref.size,
      color = _ref.color,
      width = _ref.width,
      height = _ref.height,
      props = _objectWithoutProperties(_ref, ["title", "titleId", "size", "color", "width", "height"]);

  titleId = 'gamut-icon-U3ZnR2Vhckljb24=' + titleId;
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
    d: "M8 9.9c-1.1 0-1.9-.8-1.9-1.9S7 6.1 8 6.1s1.9.8 1.9 1.9c0 1.1-.8 1.9-1.9 1.9zm7.8-3c0-.1-.1-.2-.2-.2h-2.1c-.1-.6-.4-1.2-.7-1.7l1.5-1.5c.1-.1.1-.2 0-.3l-1.5-1.5c-.1-.1-.2-.1-.3 0L11 3.1c-.5-.3-1.1-.6-1.7-.7v-2c0-.1-.1-.2-.2-.2H6.9c-.1 0-.2.1-.2.2v2c-.6.1-1.2.4-1.7.7L3.5 1.7c-.1-.1-.2-.1-.3 0L1.7 3.2c-.1.1-.1.2 0 .3L3.2 5c-.3.5-.5 1-.6 1.6H.4c-.1 0-.2.1-.2.2V9c0 .1.1.2.2.2h2.2c.1.6.4 1.1.7 1.6l-1.6 1.6c-.1.1-.1.2 0 .3l1.5 1.5c.1.1.2.1.3 0L5 12.7c.5.3 1 .5 1.6.7v2.2c0 .1.1.2.2.2H9c.1 0 .2-.1.2-.2v-2.2c.6-.1 1.1-.4 1.6-.7l1.5 1.5c.1.1.2.1.3 0l1.5-1.5c.1-.1.1-.2 0-.3l-1.5-1.5c.3-.5.5-1 .7-1.6h2.1c.1 0 .2-.1.2-.2V6.9z"
  }));
});
export default SvgGearIcon;