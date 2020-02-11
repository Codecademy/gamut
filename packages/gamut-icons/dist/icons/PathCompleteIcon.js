function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';
var SvgPathCompleteIcon = React.forwardRef(function (_ref, svgRef) {
  var _ref$title = _ref.title,
      title = _ref$title === void 0 ? 'Path Complete Icon' : _ref$title,
      _ref$titleId = _ref.titleId,
      titleId = _ref$titleId === void 0 ? '' : _ref$titleId,
      size = _ref.size,
      color = _ref.color,
      width = _ref.width,
      height = _ref.height,
      props = _objectWithoutProperties(_ref, ["title", "titleId", "size", "color", "width", "height"]);

  titleId = 'gamut-icon-U3ZnUGF0aENvbXBsZXRlSWNvbg==' + titleId;
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
    d: "M10.1 13.2L6.5 3.8s0-.1-.1-.1C4.8 3.7 4 4.3 3 4.9c-.9.6-2.2.8-2.5.9v.1l1.8 1.6-.7 2.4s0 .1.1.1c.3 0 1.3.1 2.9-.9C6.5 7.9 7 7.9 7 7.9l2.1 5.6c.1.2.3.3.6.3h.1c.3-.1.4-.4.3-.6zM2.6 9.1l.5-2L2 6.2c1.5-.4 2.6-1.5 3.8-1.6l.5 1.3.5 1.2c-1.4.3-2.9 1.8-4.2 2z"
  }), React.createElement("path", {
    d: "M9.5 3.8l-3.6 9.4c-.1.2 0 .5.2.6h.1c.2.1.5 0 .6-.2L8.9 8s.5 0 2.4 1.2c1.6 1 2.7.9 3 .8l.1-.1-.7-2.4 1.9-1.6v-.1c-.3 0-1.6-.3-2.5-.9-1.1-.6-1.9-1.2-3.6-1.1 0-.1 0 0 0 0z"
  }));
});
export default SvgPathCompleteIcon;