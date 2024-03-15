import _styled from "@emotion/styled/base";

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

import { css } from '@emotion/react';
import loadable from '@loadable/component';
import React from 'react';
var BaseImage = loadable(function () {
  return import('./BaseImage');
}, {
  ssr: false
});
export var imageStyles = _styled("img", {
  target: "e1xtjyf0",
  label: "imageStyles"
})(process.env.NODE_ENV === "production" ? {
  name: "1hzevmy-imageStyles",
  styles: "height:auto;max-height:100%;max-width:100%;&[src$=\".svg\"]{width:100%;};label:imageStyles;"
} : {
  name: "1hzevmy-imageStyles",
  styles: "height:auto;max-height:100%;max-width:100%;&[src$=\".svg\"]{width:100%;};label:imageStyles;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9QYXVzYWJsZUltYWdlL2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFjRSIsImZpbGUiOiIuLi8uLi9zcmMvUGF1c2FibGVJbWFnZS9pbmRleC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgbG9hZGFibGUgZnJvbSAnQGxvYWRhYmxlL2NvbXBvbmVudCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBCYXNlSW1hZ2UgPSBsb2FkYWJsZSgoKSA9PiBpbXBvcnQoJy4vQmFzZUltYWdlJyksIHtcbiAgc3NyOiBmYWxzZSxcbn0pO1xuXG5pbnRlcmZhY2UgUGF1c2VhYmxlSW1hZ2VQcm9wcyB7XG4gIHNyYzogc3RyaW5nO1xuICBhbHQ6IHN0cmluZztcbn1cbmV4cG9ydCBjb25zdCBpbWFnZVN0eWxlcyA9IHN0eWxlZC5pbWcoXG4gIGNzcyh7XG4gICAgaGVpZ2h0OiAnYXV0bycsXG4gICAgbWF4SGVpZ2h0OiAnMTAwJScsXG4gICAgbWF4V2lkdGg6ICcxMDAlJyxcbiAgICAnJltzcmMkPVwiLnN2Z1wiXSc6IHtcbiAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgfSxcbiAgfSlcbik7XG5cbmNvbnN0IFN0YXRpY0ltYWdlID0gaW1hZ2VTdHlsZXM7XG5cbmV4cG9ydCBjb25zdCBQYXVzYWJsZUltYWdlOiBSZWFjdC5GQzxQYXVzZWFibGVJbWFnZVByb3BzPiA9IChwcm9wcykgPT4ge1xuICBjb25zdCBzdGF0aWNJbWFnZSA9IDxTdGF0aWNJbWFnZSB7Li4ucHJvcHN9IC8+O1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIHtwcm9wcy5zcmM/LmVuZHNXaXRoKCcuZ2lmJykgPyAoXG4gICAgICAgIDxCYXNlSW1hZ2Ugey4uLnByb3BzfSBmYWxsYmFjaz17c3RhdGljSW1hZ2V9IC8+XG4gICAgICApIDogKFxuICAgICAgICBzdGF0aWNJbWFnZVxuICAgICAgKX1cbiAgICA8Lz5cbiAgKTtcbn07XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
}, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9QYXVzYWJsZUltYWdlL2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFhMkIiLCJmaWxlIjoiLi4vLi4vc3JjL1BhdXNhYmxlSW1hZ2UvaW5kZXgudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IGxvYWRhYmxlIGZyb20gJ0Bsb2FkYWJsZS9jb21wb25lbnQnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY29uc3QgQmFzZUltYWdlID0gbG9hZGFibGUoKCkgPT4gaW1wb3J0KCcuL0Jhc2VJbWFnZScpLCB7XG4gIHNzcjogZmFsc2UsXG59KTtcblxuaW50ZXJmYWNlIFBhdXNlYWJsZUltYWdlUHJvcHMge1xuICBzcmM6IHN0cmluZztcbiAgYWx0OiBzdHJpbmc7XG59XG5leHBvcnQgY29uc3QgaW1hZ2VTdHlsZXMgPSBzdHlsZWQuaW1nKFxuICBjc3Moe1xuICAgIGhlaWdodDogJ2F1dG8nLFxuICAgIG1heEhlaWdodDogJzEwMCUnLFxuICAgIG1heFdpZHRoOiAnMTAwJScsXG4gICAgJyZbc3JjJD1cIi5zdmdcIl0nOiB7XG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgIH0sXG4gIH0pXG4pO1xuXG5jb25zdCBTdGF0aWNJbWFnZSA9IGltYWdlU3R5bGVzO1xuXG5leHBvcnQgY29uc3QgUGF1c2FibGVJbWFnZTogUmVhY3QuRkM8UGF1c2VhYmxlSW1hZ2VQcm9wcz4gPSAocHJvcHMpID0+IHtcbiAgY29uc3Qgc3RhdGljSW1hZ2UgPSA8U3RhdGljSW1hZ2Ugey4uLnByb3BzfSAvPjtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICB7cHJvcHMuc3JjPy5lbmRzV2l0aCgnLmdpZicpID8gKFxuICAgICAgICA8QmFzZUltYWdlIHsuLi5wcm9wc30gZmFsbGJhY2s9e3N0YXRpY0ltYWdlfSAvPlxuICAgICAgKSA6IChcbiAgICAgICAgc3RhdGljSW1hZ2VcbiAgICAgICl9XG4gICAgPC8+XG4gICk7XG59O1xuIl19 */");
var StaticImage = imageStyles;
export var PausableImage = function PausableImage(props) {
  var _props$src;

  var staticImage = /*#__PURE__*/React.createElement(StaticImage, props);
  return /*#__PURE__*/React.createElement(React.Fragment, null, (_props$src = props.src) !== null && _props$src !== void 0 && _props$src.endsWith('.gif') ? /*#__PURE__*/React.createElement(BaseImage, _extends({}, props, {
    fallback: staticImage
  })) : staticImage);
};