function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';
var SvgLifePreserverIcon = React.forwardRef(function (_ref, svgRef) {
  var _ref$title = _ref.title,
      title = _ref$title === void 0 ? 'Life Preserver Icon' : _ref$title,
      _ref$titleId = _ref.titleId,
      titleId = _ref$titleId === void 0 ? '' : _ref$titleId,
      size = _ref.size,
      color = _ref.color,
      width = _ref.width,
      height = _ref.height,
      props = _objectWithoutProperties(_ref, ["title", "titleId", "size", "color", "width", "height"]);

  titleId = 'gamut-icon-U3ZnTGlmZVByZXNlcnZlckljb24=' + titleId;
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
    fillRule: "evenodd"
  }, React.createElement("path", {
    d: "M5.227 8.631L8.18 10.44a4.134 4.134 0 00.268 3.66L5.51 15.886a7.578 7.578 0 01-.284-7.256zm2.886-3.12a7.575 7.575 0 017.774 0l-1.788 2.937a4.132 4.132 0 00-4.198 0L8.113 5.511zm7.259 13.26a7.582 7.582 0 01-6.741.002l1.808-2.953a4.14 4.14 0 003.133-.005l1.8 2.957zm3.119-2.886l-2.933-1.796a4.134 4.134 0 00.261-3.65l2.954-1.808a7.578 7.578 0 01-.282 7.254z"
  }), React.createElement("path", {
    d: "M12 16.125a4.125 4.125 0 110-8.25 4.125 4.125 0 010 8.25zm0-.917a3.208 3.208 0 100-6.416 3.208 3.208 0 000 6.416z",
    fillRule: "nonzero"
  }), React.createElement("path", {
    d: "M12 20.25a8.25 8.25 0 110-16.5 8.25 8.25 0 010 16.5zm0-1.833a6.417 6.417 0 100-12.834 6.417 6.417 0 000 12.834z",
    fillRule: "nonzero"
  })));
});
export default SvgLifePreserverIcon;