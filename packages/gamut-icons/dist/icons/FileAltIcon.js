function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';
var SvgFileAltIcon = React.forwardRef(function (_ref, svgRef) {
  var _ref$title = _ref.title,
      title = _ref$title === void 0 ? 'File Alt Icon' : _ref$title,
      _ref$titleId = _ref.titleId,
      titleId = _ref$titleId === void 0 ? '' : _ref$titleId,
      size = _ref.size,
      color = _ref.color,
      width = _ref.width,
      height = _ref.height,
      props = _objectWithoutProperties(_ref, ["title", "titleId", "size", "color", "width", "height"]);

  titleId = 'gamut-icon-U3ZnRmlsZUFsdEljb24=' + titleId;
  return React.createElement("svg", _extends({
    viewBox: "0 0 32 32",
    width: size || width || '16px',
    height: size || height || '16px',
    fill: color || 'currentColor',
    role: "img",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? React.createElement("title", {
    id: titleId
  }, title) : null, React.createElement("path", {
    className: "file-alt-icon_svg__file-alt-icon_svg__st0",
    d: "M18 0H8C5.8 0 4 1.8 4 4v24c0 2.2 1.8 4 4 4h16c2.2 0 4-1.8 4-4V10L18 0zm8 28c0 1.2-.8 2-2 2H8c-1.2 0-2-.8-2-2V4c0-1.2.8-2 2-2h8v10h10v16z"
  }), React.createElement("path", {
    className: "file-alt-icon_svg__file-alt-icon_svg__st0",
    d: "M10 24h12v2H10v-2zm0-4h12v2H10v-2zm0-4h12v2H10v-2z"
  }));
});
export default SvgFileAltIcon;