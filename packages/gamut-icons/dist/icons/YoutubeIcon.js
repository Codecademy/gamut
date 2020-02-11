function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';
var SvgYoutubeIcon = React.forwardRef(function (_ref, svgRef) {
  var _ref$title = _ref.title,
      title = _ref$title === void 0 ? 'Youtube Icon' : _ref$title,
      _ref$titleId = _ref.titleId,
      titleId = _ref$titleId === void 0 ? '' : _ref$titleId,
      size = _ref.size,
      color = _ref.color,
      width = _ref.width,
      height = _ref.height,
      props = _objectWithoutProperties(_ref, ["title", "titleId", "size", "color", "width", "height"]);

  titleId = 'gamut-icon-U3ZnWW91dHViZUljb24=' + titleId;
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
    d: "M12.6 11.7h-.9v-.5c0-.2.2-.4.4-.4h.1c.2 0 .4.2.4.4v.5zm-3.3-1.1c-.2 0-.4.1-.4.3v2.5c0 .2.2.3.4.3s.4-.1.4-.3v-2.5c0-.1-.2-.3-.4-.3zm5.4-1.4v4.7c0 1.1-1 2.1-2.2 2.1h-9c-1.2 0-2.2-.9-2.2-2.1V9.2c0-1.1 1-2.1 2.2-2.1h9c1.2.1 2.2 1 2.2 2.1zM4.1 14.5v-5h1.1v-.8h-3v.7h.9v5h1zm3.3-4.3h-.9v3.3c-.1.2-.4.4-.5 0v-3.3H5v3.4c0 .2 0 .5.2.7.4.3 1.2 0 1.4-.5v.5h.7v-4.1zm3 3.1v-2.2c0-.8-.6-1.3-1.5-.7V8.8L8 8.7v5.7h.8l.1-.4c.9.9 1.5.3 1.5-.7zm2.9-.3h-.7v.5c0 .2-.2.4-.4.4h-.1c-.2 0-.4-.2-.4-.4v-1.1h1.6v-1.7c-.1-.8-1.2-.9-1.8-.5-.2.1-.3.3-.4.5-.1.3-.1.6-.1 1V13c0 2.2 2.6 1.9 2.3 0zM9.7 5.8l.3.3c.1.1.2.1.4.1.1 0 .3 0 .4-.1 0-.1.1-.2.2-.3v.4h1V1.7h-.8v3.4c0 .2-.2.3-.3.3-.2 0-.3-.2-.3-.3V1.7h-1v3.8c.1.1.1.2.1.3zM6.6 3.3c0-.4 0-.8.1-1s.2-.4.4-.6c.2-.1.4-.2.7-.2.2 0 .4 0 .6.1s.3.2.4.4c.1.2.2.4.2.5 0 .2.1.4.1.7v2c0 .2-.1.4-.2.5-.2.2-.3.4-.5.4-.2.1-.3.2-.6.2-.2 0-.4 0-.6-.1l-.3-.3c-.1-.2-.2-.3-.2-.5s-.1-.5-.1-.9V3.3zm.8 1.8c0 .2.2.5.4.5s.4-.2.4-.5V2.7c0-.2-.2-.5-.4-.5s-.4.2-.4.5v2.4zM4.6 6.3h1V2.9L6.7 0H5.6L5 2.2 4.4 0H3.3l1.2 2.9.1 3.4z"
  }));
});
export default SvgYoutubeIcon;