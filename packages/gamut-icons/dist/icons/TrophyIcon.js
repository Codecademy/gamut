function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';
var SvgTrophyIcon = React.forwardRef(function (_ref, svgRef) {
  var _ref$title = _ref.title,
      title = _ref$title === void 0 ? 'Trophy Icon' : _ref$title,
      _ref$titleId = _ref.titleId,
      titleId = _ref$titleId === void 0 ? '' : _ref$titleId,
      size = _ref.size,
      color = _ref.color,
      width = _ref.width,
      height = _ref.height,
      props = _objectWithoutProperties(_ref, ["title", "titleId", "size", "color", "width", "height"]);

  titleId = 'gamut-icon-U3ZnVHJvcGh5SWNvbg==' + titleId;
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
    d: "M6.503 3.801v5.404a5.404 5.404 0 1010.808 0V3.801H6.503zm6.305 12.554V19h2.894v1h-8v-1h3.304v-2.645a7.206 7.206 0 01-6.304-7.15V2h14.41v7.205a7.206 7.206 0 01-6.304 7.15zm-7.205 4.559h12v1h-12v-1z"
  }), React.createElement("path", {
    d: "M4.702 5.603H2.9v2.702c0 1.176.752 2.177 1.8 2.548.601.237.902.288.902.153 0-1.031-.3-2.833-.901-5.403zm.9 6.304A3.603 3.603 0 012 8.305V4.702h3.603v7.205zm13.51-6.304h1.802v2.702a2.703 2.703 0 01-1.802 2.548c-.6.237-.9.288-.9.153 0-1.031.3-2.833.9-5.403zm-.9 6.304a3.603 3.603 0 003.602-3.602V4.702h-3.602v7.205z"
  }));
});
export default SvgTrophyIcon;