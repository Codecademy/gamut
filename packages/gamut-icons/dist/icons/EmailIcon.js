function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';
var SvgEmailIcon = React.forwardRef(function (_ref, svgRef) {
  var _ref$title = _ref.title,
      title = _ref$title === void 0 ? 'Email Icon' : _ref$title,
      _ref$titleId = _ref.titleId,
      titleId = _ref$titleId === void 0 ? '' : _ref$titleId,
      size = _ref.size,
      color = _ref.color,
      width = _ref.width,
      height = _ref.height,
      props = _objectWithoutProperties(_ref, ["title", "titleId", "size", "color", "width", "height"]);

  titleId = 'gamut-icon-U3ZnRW1haWxJY29u' + titleId;
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
    d: "M.2 3.8c-.1-.1-.2-.1-.2.1v8.9c0 .1.1.2.2.1l4.8-5c.1-.1.1-.2 0-.3L.2 3.8zm15.6-1.7c.1-.1.1-.2-.1-.2H.3c-.1 0-.2.1 0 .2l7.5 6c.1.1.3.1.4 0l7.6-6zm-5.4 6.3c-.1-.1-.3-.1-.4 0L8.2 9.8c-.1.1-.3.1-.4 0L5.9 8.3c-.1-.1-.3-.1-.4 0L.1 13.9c-.1.1-.1.2.1.2h15.5c.1 0 .2-.1.1-.2l-5.4-5.5zm.6-.8c-.1.1-.1.2 0 .3l4.8 4.9c.1.1.2.1.2-.1V3.9c0-.1-.1-.2-.2-.1l-.3.2c-.1.1-.3.2-.4.3L11 7.6z"
  }));
});
export default SvgEmailIcon;