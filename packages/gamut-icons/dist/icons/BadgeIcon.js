function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';
var SvgBadgeIcon = React.forwardRef(function (_ref, svgRef) {
  var _ref$title = _ref.title,
      title = _ref$title === void 0 ? 'Badge Icon' : _ref$title,
      _ref$titleId = _ref.titleId,
      titleId = _ref$titleId === void 0 ? '' : _ref$titleId,
      size = _ref.size,
      color = _ref.color,
      width = _ref.width,
      height = _ref.height,
      props = _objectWithoutProperties(_ref, ["title", "titleId", "size", "color", "width", "height"]);

  titleId = 'gamut-icon-U3ZnQmFkZ2VJY29u' + titleId;
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
    d: "M13.7 6.4c-.6-1.7-.3-2.3.4-3l.6-.6C11.5.1 12.2.7 11.4 0c-.4.4-.8 1-1.7 1C8.9 1 8.3.3 8 0c-.4.4-.9 1-1.7 1C5.4 1 5 .3 4.6 0L1.4 2.8l.6.6c.7.7 1 1.2.4 3-.6 1.5-1.1 2.6-1.1 3.8 0 2.2 1.4 3.8 3.8 4.4 1.7.4 2 .6 2.9 1.4.9-.7 1.2-.9 2.9-1.4 2.4-.6 3.8-2.2 3.8-4.4 0-1.2-.5-2.3-1-3.8zm-4 2.2l.4 2.3L8 9.8l-2.1 1.1.4-2.3-1.6-1.7L7 6.6l1-2.1 1 2.1 2.3.3-1.6 1.7z"
  }));
});
export default SvgBadgeIcon;