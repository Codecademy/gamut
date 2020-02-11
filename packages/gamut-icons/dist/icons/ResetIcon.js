function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';
var SvgResetIcon = React.forwardRef(function (_ref, svgRef) {
  var _ref$title = _ref.title,
      title = _ref$title === void 0 ? 'Reset Icon' : _ref$title,
      _ref$titleId = _ref.titleId,
      titleId = _ref$titleId === void 0 ? '' : _ref$titleId,
      size = _ref.size,
      color = _ref.color,
      width = _ref.width,
      height = _ref.height,
      props = _objectWithoutProperties(_ref, ["title", "titleId", "size", "color", "width", "height"]);

  titleId = 'gamut-icon-U3ZnUmVzZXRJY29u' + titleId;
  return React.createElement("svg", _extends({
    fill: color || 'currentColor',
    viewBox: "0 0 24 24",
    width: size || width || '16px',
    height: size || height || '16px',
    role: "img",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? React.createElement("title", {
    id: titleId
  }, title) : null, React.createElement("path", {
    d: "M5.338 10.91A6.752 6.752 0 0112 5.25c1.868 0 3.533.776 4.748 2.003l-3.623 3.622H21V3l-2.644 2.644A8.953 8.953 0 0012 3c-4.621 0-8.488 3.426-9 7.91m15.724 2.265a6.752 6.752 0 01-6.648 5.575c-1.867 0-3.532-.776-4.747-2.003l3.622-3.622H3.076V21l2.644-2.644A8.953 8.953 0 0012.076 21 9.002 9.002 0 0021 13.177"
  }));
});
export default SvgResetIcon;