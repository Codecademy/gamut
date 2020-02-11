function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';
var SvgGlassesIcon = React.forwardRef(function (_ref, svgRef) {
  var _ref$title = _ref.title,
      title = _ref$title === void 0 ? 'Glasses Icon' : _ref$title,
      _ref$titleId = _ref.titleId,
      titleId = _ref$titleId === void 0 ? '' : _ref$titleId,
      size = _ref.size,
      color = _ref.color,
      width = _ref.width,
      height = _ref.height,
      props = _objectWithoutProperties(_ref, ["title", "titleId", "size", "color", "width", "height"]);

  titleId = 'gamut-icon-U3ZnR2xhc3Nlc0ljb24=' + titleId;
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
    d: "M4.363 8.8a.65.65 0 00-.535.27c-.127.162-.182.4-.154.659l.453 3.229c.073.702.6 1.242 1.144 1.242h2.723c.58 0 1.234-.605 1.361-1.274l.962-3.446a.778.778 0 00-.054-.475.548.548 0 00-.454-.205H4.363zM7.752 16h-2.55c-1.378 0-2.585-1.26-2.755-2.86l-.425-2.99c-.093-.85.11-1.65.553-2.23C3.017 7.34 3.663 7 4.35 7h5.1c.706 0 1.344.35 1.752.96.093.15.178.31.246.49.366-.09.74-.09 1.097 0 .068-.18.153-.34.255-.49.4-.61 1.037-.96 1.75-.96h5.101c.688 0 1.335.34 1.777.92.433.58.637 1.38.552 2.19l-.433 3.07C21.386 14.74 20.17 16 18.802 16h-2.55c-1.326 0-2.618-1.19-2.941-2.7l-.765-2.71a.82.82 0 00-1.097 0l-.782 2.78C10.361 14.82 9.077 16 7.752 16zm6.439-7.2a.55.55 0 00-.454.205c-.073.13-.091.335-.046.551l.917 3.294c.164.745.817 1.35 1.398 1.35h2.723c.536 0 1.071-.54 1.135-1.199l.462-3.315a.855.855 0 00-.154-.616.65.65 0 00-.535-.27H14.19z"
  }));
});
export default SvgGlassesIcon;