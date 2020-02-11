function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';
var SvgProjectIcon = React.forwardRef(function (_ref, svgRef) {
  var _ref$title = _ref.title,
      title = _ref$title === void 0 ? 'Project Icon' : _ref$title,
      _ref$titleId = _ref.titleId,
      titleId = _ref$titleId === void 0 ? '' : _ref$titleId,
      size = _ref.size,
      color = _ref.color,
      width = _ref.width,
      height = _ref.height,
      props = _objectWithoutProperties(_ref, ["title", "titleId", "size", "color", "width", "height"]);

  titleId = 'gamut-icon-U3ZnUHJvamVjdEljb24=' + titleId;
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
    d: "M18.857 11.571h-1.286V8.143c0-.952-.771-1.714-1.714-1.714H12.43V5.143a2.143 2.143 0 10-4.286 0v1.286h-3.43C3.768 6.429 3 7.196 3 8.143V11.4h1.286A2.305 2.305 0 016.6 13.714a2.305 2.305 0 01-2.314 2.315H3v3.257C3 20.232 3.768 21 4.714 21h3.257v-1.286a2.305 2.305 0 012.315-2.314 2.305 2.305 0 012.314 2.314V21h3.257c.947 0 1.714-.768 1.714-1.714v-3.429h1.286a2.143 2.143 0 000-4.286z"
  }));
});
export default SvgProjectIcon;