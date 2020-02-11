function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';
var SvgHintIcon = React.forwardRef(function (_ref, svgRef) {
  var _ref$title = _ref.title,
      title = _ref$title === void 0 ? 'Hint Icon' : _ref$title,
      _ref$titleId = _ref.titleId,
      titleId = _ref$titleId === void 0 ? '' : _ref$titleId,
      size = _ref.size,
      color = _ref.color,
      width = _ref.width,
      height = _ref.height,
      props = _objectWithoutProperties(_ref, ["title", "titleId", "size", "color", "width", "height"]);

  titleId = 'gamut-icon-U3ZnSGludEljb24=' + titleId;
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
    d: "M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm1 11.9c0 .1-.1.1-.1.1H7.2c-.1 0-.2 0-.2-.1v-.8c0-.1 0-.1.1-.1h1.7c.1 0 .1 0 .1.1v.8zm.8-4.3l-.7 1.1c-.2.2-.2.5-.2.9v.3c0 .1 0 .1-.1.1H7.2c-.1 0-.2-.1-.2-.2v-.5c0-.5.2-.9.5-1.2L8.3 7c.3-.4.5-.7.5-1 0-.5-.3-.8-.8-.8s-.8.4-.9.9c0 .1-.1.1-.2.1L5.6 6s-.1 0-.1-.1c.2-1.2 1.1-2 2.5-2s2.4.9 2.4 2.2c.1.5-.2 1-.6 1.5z"
  }));
});
export default SvgHintIcon;