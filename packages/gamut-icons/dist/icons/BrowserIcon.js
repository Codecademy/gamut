function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';
var SvgBrowserIcon = React.forwardRef(function (_ref, svgRef) {
  var _ref$title = _ref.title,
      title = _ref$title === void 0 ? 'Browser Icon' : _ref$title,
      _ref$titleId = _ref.titleId,
      titleId = _ref$titleId === void 0 ? '' : _ref$titleId,
      size = _ref.size,
      color = _ref.color,
      width = _ref.width,
      height = _ref.height,
      props = _objectWithoutProperties(_ref, ["title", "titleId", "size", "color", "width", "height"]);

  titleId = 'gamut-icon-U3ZnQnJvd3Nlckljb24=' + titleId;
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
    fill: color || 'currentColor',
    d: "M16 0C7.2 0 0 7.2 0 16s7.2 16 16 16 16-7.2 16-16S24.8 0 16 0zm0 30C8.2 30 2 23.8 2 16c0-3.8 1.6-7.2 4-9.6.2.4.4.8.2 1.2-.4.6-.6 1.2-.4 2 .4.4.8 1.6 1 2s.6 1.2.8 1.2c.2-.2-.8-1.4-.4-1.6s.6.2.8.8c.2.6 0 1.6.6 2s1.4 1.2 2 1 .8.2 1.2.6c.4.2.2 1 .8 1s1-.4 1 .4-1 1.2-.4 2.6C13.6 21 15 21.8 15 23s-.2 3.6-.6 4.2 0 1-.2 1.6c-.2.4-.2.8-.4 1 .4 0 .8.2 1.2.2.2-.2.2-.4.4-.6.8-1 .6-1.4 2-2s2-1 2-1.8.8-.6 1.4-1.6c.8-1 .8-2.6 1.6-3s.4-1.4-1-1.4-1.8-.8-2.2-.6.8-1-.4-1.2c-.8-.4-1.2 0-1.4-.4-.2-.2.6-1.4-.6-1.4-1 0-2.2-.2-2.6 0-.6.2-1.2 0-1.4-.2s.2-1-.4-1c-.4 0-.8-.6-.6-.8.2-.4.4-.8 0-.6-.6.2-1.2.8-1.4.4s-.8-2.6.4-2.6 1.8-.4 2.2.6.6.6.4-.2 1-3.6 1.6-3.4c.6.2 1.2.4 1.2 0s-1.4-.8-.6-1 1.6.6 1-.4C15.8 5.6 14.2 4 13.8 5s.6 1.8-.4 1.8-2.4-.8-2-1.6 1.6-1.4.2-1.4H9.4c1.2-.8 2.6-1.4 4.2-1.6.2 0 .6.2 1.4.8.8.8 1 1.6 1.8 1.6.8.2.6.6 1 .4.4 0-.2-.6.4-1s.8-.6.4-1.2c-.2 0-.4-.4-.4-.6 4.8.8 8.8 4 10.6 8.2-.2.2-.4.4-.6.8-.6 1.2-1.6 1.6-2 2.4s-1.4 2-.2 3 2 1 3 .8h1v-1.6c0 8-6.2 14.2-14 14.2z"
  }));
});
export default SvgBrowserIcon;