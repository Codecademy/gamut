function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';
var SvgPracticeIcon = React.forwardRef(function (_ref, svgRef) {
  var _ref$title = _ref.title,
      title = _ref$title === void 0 ? 'Practice Icon' : _ref$title,
      _ref$titleId = _ref.titleId,
      titleId = _ref$titleId === void 0 ? '' : _ref$titleId,
      size = _ref.size,
      color = _ref.color,
      width = _ref.width,
      height = _ref.height,
      props = _objectWithoutProperties(_ref, ["title", "titleId", "size", "color", "width", "height"]);

  titleId = 'gamut-icon-U3ZnUHJhY3RpY2VJY29u' + titleId;
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
    transform: "rotate(-45 19.071 9.485)",
    fillRule: "evenodd"
  }, React.createElement("path", {
    d: "M9 4.667h7.111v3.556H9z"
  }), React.createElement("rect", {
    x: 17,
    width: 4,
    height: 12,
    rx: 1
  }), React.createElement("rect", {
    x: 4,
    width: 4,
    height: 12,
    rx: 1
  }), React.createElement("rect", {
    x: 22,
    y: 2,
    width: 3,
    height: 8,
    rx: 1
  }), React.createElement("rect", {
    y: 2,
    width: 3,
    height: 8,
    rx: 1
  })));
});
export default SvgPracticeIcon;