function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';
var SvgCopyIcon = React.forwardRef(function (_ref, svgRef) {
  var _ref$title = _ref.title,
      title = _ref$title === void 0 ? 'Copy Icon' : _ref$title,
      _ref$titleId = _ref.titleId,
      titleId = _ref$titleId === void 0 ? '' : _ref$titleId,
      size = _ref.size,
      color = _ref.color,
      width = _ref.width,
      height = _ref.height,
      props = _objectWithoutProperties(_ref, ["title", "titleId", "size", "color", "width", "height"]);

  titleId = 'gamut-icon-U3ZnQ29weUljb24=' + titleId;
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
    d: "M9.998 22H3.267C2.567 22 2 21.414 2 20.69V5.308c0-.723.567-1.309 1.267-1.309h1.736V1.955a.43.43 0 01.422-.436h.388a.43.43 0 00.422-.436V.875c0-.483.38-.875.847-.875h4.622c.467 0 .847.392.847.875v.208a.43.43 0 00.422.436h.605a.43.43 0 01.422.436v2.043h1.734c.7 0 1.267.586 1.267 1.31V12l2.995.014c1.003 0 2 1 2 2.005v7.813c0 1.205-.946 2.182-2.112 2.182L12.048 24c-1 0-2.05-.998-2.05-2zM10 14.005C10 13 10.998 12 11.998 12h3.999V5H14v.579a.428.428 0 01-.42.436H5.42a.43.43 0 01-.423-.436V5H3.001v16H10v-6.995zm2.003-1.002c-.497 0-1 .495-1 1.001V22c0 .5.498 1.002 1 1.002h7.994c.5 0 1.003-.503 1.003-1.002v-7.996c0-.503-.503-1.001-1.003-1.001h-7.994zM16.997 17H18.5c.5 0 .997.497.997 1 0 .505-.498.997-.997.997h-1.503V20.5c0 .5-.497.997-1 .997-.505 0-.997-.497-.997-.997v-1.503h-1.5c-.5 0-1-.5-1-.997 0-.496.5-1 1-1H15v-1.5c0-.5.5-1 .997-1s1 .5 1 1V17z"
  }));
});
export default SvgCopyIcon;