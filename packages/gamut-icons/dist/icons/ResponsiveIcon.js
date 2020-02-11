function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';
var SvgResponsiveIcon = React.forwardRef(function (_ref, svgRef) {
  var _ref$title = _ref.title,
      title = _ref$title === void 0 ? 'Responsive Icon' : _ref$title,
      _ref$titleId = _ref.titleId,
      titleId = _ref$titleId === void 0 ? '' : _ref$titleId,
      size = _ref.size,
      color = _ref.color,
      width = _ref.width,
      height = _ref.height,
      props = _objectWithoutProperties(_ref, ["title", "titleId", "size", "color", "width", "height"]);

  titleId = 'gamut-icon-U3ZnUmVzcG9uc2l2ZUljb24=' + titleId;
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
    fill: "none",
    stroke: color || 'currentColor'
  }, React.createElement("rect", {
    x: 0.5,
    y: 0.5,
    width: 11,
    height: 14,
    rx: 1,
    transform: "rotate(90 6 11)"
  }), React.createElement("path", {
    d: "M18.5 11.5h3",
    strokeLinecap: "square"
  }), React.createElement("rect", {
    x: 18.5,
    y: 10.5,
    width: 3,
    height: 6,
    rx: 1
  })), React.createElement("path", {
    d: "M3 5h13v2H3zm3 3l.636 6.3 2.86.7 2.868-.7L13 8H6zm5.967 6l-2.463.605-2.457-.598-.57-5.625h6.06L11.968 14z"
  }), React.createElement("path", {
    d: "M7.044 9.457h4.384l-.159 1.522H8.48l.053.456h2.693l-.185 1.728-1.443.342-.08.023-.096-.023-1.461-.342-.08-.723h-.528l.115 1.073L9.5 14l2.033-.487L12 9H7z"
  }));
});
export default SvgResponsiveIcon;