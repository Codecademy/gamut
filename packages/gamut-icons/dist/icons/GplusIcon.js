function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';
var SvgGplusIcon = React.forwardRef(function (_ref, svgRef) {
  var _ref$title = _ref.title,
      title = _ref$title === void 0 ? 'Gplus Icon' : _ref$title,
      _ref$titleId = _ref.titleId,
      titleId = _ref$titleId === void 0 ? '' : _ref$titleId,
      size = _ref.size,
      color = _ref.color,
      width = _ref.width,
      height = _ref.height,
      props = _objectWithoutProperties(_ref, ["title", "titleId", "size", "color", "width", "height"]);

  titleId = 'gamut-icon-U3ZnR3BsdXNJY29u' + titleId;
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
    fill: color || 'currentColor',
    d: "M16 3.5h-2.1v2.1h-1.1V3.5h-2.1v-1h2.1V.4h1.1v2.1H16v1zm-6 8.8c0 1.6-1.5 3.5-5.1 3.5-2.7 0-4.9-1.2-4.9-3.1 0-1.5.9-3.4 5.4-3.4-.7-.5-.8-1.3-.4-2.1-2.6 0-4-1.5-4-3.4S2.4.2 5.3.2h4.6l-1 1.1H7.7C8.5 1.7 9 2.7 9 3.8c0 1-.6 1.8-1.4 2.5-1.4 1.1-1 1.7.5 2.8C9.5 10.2 10 11 10 12.3zM7.1 3.9c-.2-1.6-1.3-3-2.5-3S2.5 2.1 2.7 3.7C3 5.4 4.2 6.5 5.4 6.5c1.2.1 1.9-1 1.7-2.6zm1.3 8.6c0-1.3-1.2-2.6-3.3-2.6-1.8 0-3.4 1.2-3.4 2.5C1.7 13.8 3 15 4.9 15c2.4 0 3.5-1.1 3.5-2.5z"
  }));
});
export default SvgGplusIcon;