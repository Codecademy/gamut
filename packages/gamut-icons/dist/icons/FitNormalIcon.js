function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';
var SvgFitNormalIcon = React.forwardRef(function (_ref, svgRef) {
  var _ref$title = _ref.title,
      title = _ref$title === void 0 ? 'Fit Normal Icon' : _ref$title,
      _ref$titleId = _ref.titleId,
      titleId = _ref$titleId === void 0 ? '' : _ref$titleId,
      size = _ref.size,
      color = _ref.color,
      width = _ref.width,
      height = _ref.height,
      props = _objectWithoutProperties(_ref, ["title", "titleId", "size", "color", "width", "height"]);

  titleId = 'gamut-icon-U3ZnRml0Tm9ybWFsSWNvbg==' + titleId;
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
    d: "M28 0H4C1.8 0 0 1.8 0 4v24c0 2.2 1.8 4 4 4h24c2.2 0 4-1.8 4-4V4c0-2.2-1.8-4-4-4zm2 28c0 1.2-.8 2-2 2H4c-1.2 0-2-.8-2-2V4c0-1.2.8-2 2-2h24c1.2 0 2 .8 2 2v24z"
  }), React.createElement("path", {
    fill: color || 'currentColor',
    d: "M21 9.4c-.2 0-.6 0-.8.2-.4.4-.4 1 0 1.4l4 4H7.8l4-4c.4-.4.4-1 0-1.4s-1-.4-1.4 0L4 16l6.4 6.4c.2.2.4.2.8.2s.6 0 .8-.2c.4-.4.4-1 0-1.4l-4-4h16.4l-4 4c-.4.4-.4 1 0 1.4s1 .4 1.4 0L28 16l-6.4-6.4c-.2-.2-.4-.2-.6-.2z"
  }));
});
export default SvgFitNormalIcon;