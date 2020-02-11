function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';
var SvgGithubIcon = React.forwardRef(function (_ref, svgRef) {
  var _ref$title = _ref.title,
      title = _ref$title === void 0 ? 'Github Icon' : _ref$title,
      _ref$titleId = _ref.titleId,
      titleId = _ref$titleId === void 0 ? '' : _ref$titleId,
      size = _ref.size,
      color = _ref.color,
      width = _ref.width,
      height = _ref.height,
      props = _objectWithoutProperties(_ref, ["title", "titleId", "size", "color", "width", "height"]);

  titleId = 'gamut-icon-U3ZnR2l0aHViSWNvbg==' + titleId;
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
    d: "M16 7.8v-.1c-.9-.1-1.8-.1-2.6 0 .1-.4.2-.9.2-1.5 0-1.2-.4-2.1-1-2.9.1-.7 0-1.5-.2-2.2-.9.1-1.7.4-2.4.9-1.3-.3-2.7-.3-4 0-1-.7-1.8-1-2.6-1-.3.8-.3 1.6-.1 2.4-.7.8-1 1.7-1 2.7 0 .6.1 1.1.3 1.6-.9-.1-1.7-.1-2.6-.1v.1c.9-.1 1.8-.1 2.6 0 0 .1.1.2.1.2-.9.1-1.7.1-2.5.3v.1c.8-.1 1.7-.2 2.6-.2.6 1.1 1.8 1.8 3.6 2-.4.3-.6.7-.7 1.2h-.9c-1.3 0-1.6-1.6-2.9-1.4 1.3.6 1 2.6 3 2.6h.8v1.8c0 .3-.1.5-.3.6.7.1 1.3-.3 1.3-.7v-2.4c0-.2.2-.2.2-.2v2.8c0 .3-.1.4-.3.6.6 0 1.2-.1 1.3-.6v-2.7c0-.1.2-.1.2 0v2.6c0 .5.4.8 1.2.8-.2-.2-.3-.4-.3-.6v-2.8s.2 0 .2.2v2.4c0 .5.6.7 1.4.7-.2-.2-.4-.4-.4-.7v-2.8c0-.4-.2-.8-.5-1.2 1.6-.2 2.8-.9 3.4-2.1 1 0 1.8 0 2.6.2v-.1C15 8 14.2 8 13.2 8c0-.1.1-.1.1-.2.9-.1 1.8-.1 2.7 0zM2.5 10.1c-.1 0-.1 0 0 0-.1-.1 0-.1 0-.1s.1 0 0 .1c.1 0 0 0 0 0zm.2.2s-.1-.1 0 0c-.1-.1 0-.1 0-.1.1-.1.1 0 0 .1.1-.1.1 0 0 0zm.2.2s-.1-.1 0 0c-.1-.1-.1-.1 0-.1.1-.1.1-.1 0 .1.1-.1.1 0 0 0zm.3.2c-.1 0-.1 0-.1-.1 0 0 0-.1.1-.1s.1 0 .1.1-.1.1-.1.1zm.2.3c-.1 0-.1 0-.1-.1s.1-.1.1-.1.1 0 .1.1 0 .1-.1.1zm.3.2c-.1 0-.1 0-.1-.1s.1-.1.1-.1.1 0 .1.1 0 .1-.1.1zm.4.3c-.1 0-.2 0-.2-.1s.1-.1.2-.1.2 0 .2.1c-.1.1-.1.1-.2.1zm.5.1c-.1 0-.2 0-.2-.1s.1-.1.2-.1.2 0 .2.1c-.1.1-.2.1-.2.1zm.5.1c-.1 0-.2 0-.2-.1s.1-.1.2-.1.2 0 .2.1c-.1 0-.2.1-.2.1zm.5 0c-.1 0-.2 0-.2-.1s.1-.1.2-.1.2 0 .2.1c-.1 0-.2.1-.2.1z"
  }));
});
export default SvgGithubIcon;