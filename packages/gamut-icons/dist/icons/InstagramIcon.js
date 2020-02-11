function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';
var SvgInstagramIcon = React.forwardRef(function (_ref, svgRef) {
  var _ref$title = _ref.title,
      title = _ref$title === void 0 ? 'Instagram Icon' : _ref$title,
      _ref$titleId = _ref.titleId,
      titleId = _ref$titleId === void 0 ? '' : _ref$titleId,
      size = _ref.size,
      color = _ref.color,
      width = _ref.width,
      height = _ref.height,
      props = _objectWithoutProperties(_ref, ["title", "titleId", "size", "color", "width", "height"]);

  titleId = 'gamut-icon-U3ZnSW5zdGFncmFtSWNvbg==' + titleId;
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
    d: "M14 16H2c-1.1 0-2-.9-2-2V2C0 .9.9 0 2 0h12c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2zM8 4.9c-1.2 0-2.3.7-2.8 1.8 0 .1-.1.1-.1.2V7c-.1.1-.1.2-.1.2v.7C5 9.6 6.4 11 8.1 11s3.1-1.4 3.1-3.1v-.7s0-.1-.1-.2v-.1c0-.1-.1-.1-.1-.2-.7-1.1-1.8-1.8-3-1.8zm6.2-2.3c0-.4-.4-.8-.8-.8h-1.6c-.4 0-.8.4-.8.8v1.6c0 .4.4.8.8.8h1.6c.4 0 .8-.4.8-.8V2.6zm0 4.1h-1.5c.1.4.2.8.2 1.3 0 2.7-2.2 4.9-4.9 4.9S3.1 10.7 3.1 8c0-.5.1-.9.2-1.3H1.8v6.7c0 .4.4.8.8.8h10.8c.4 0 .8-.4.8-.8V6.7z"
  }));
});
export default SvgInstagramIcon;