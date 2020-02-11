function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';
var SvgMaintenanceIcon = React.forwardRef(function (_ref, svgRef) {
  var _ref$title = _ref.title,
      title = _ref$title === void 0 ? 'Maintenance Icon' : _ref$title,
      _ref$titleId = _ref.titleId,
      titleId = _ref$titleId === void 0 ? '' : _ref$titleId,
      size = _ref.size,
      color = _ref.color,
      width = _ref.width,
      height = _ref.height,
      props = _objectWithoutProperties(_ref, ["title", "titleId", "size", "color", "width", "height"]);

  titleId = 'gamut-icon-U3ZnTWFpbnRlbmFuY2VJY29u' + titleId;
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
  }, title) : null, React.createElement("g", {
    transform: "translate(2 2)"
  }, React.createElement("circle", {
    cx: 10,
    cy: 10,
    r: 10
  }), React.createElement("path", {
    d: "M8.5 4v3H8V5.157a5.772 5.772 0 00-.975.458A5.763 5.763 0 004.254 10h11.463c.018.166.03.333.033.5a5.762 5.762 0 00-2.92-4.948 5.772 5.772 0 00-.83-.38V7h-.5V4h-1.268v1.5h-.5V4H8.5zm7.25 6.5H3.5c-.277 0-.5.223-.5.5v.5c0 .277.223.5.5.5h13c.277 0 .5-.223.5-.5V11c0-.277-.223-.5-.5-.5h-.75zm-5.768-3a1 1 0 110 2 1 1 0 010-2z",
    fill: "#FFF"
  })));
});
export default SvgMaintenanceIcon;