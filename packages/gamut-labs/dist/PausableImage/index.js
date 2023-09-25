function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
import _styled from "@emotion/styled/base";
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
import { css } from '@emotion/react';
import * as React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var BaseImage = /*#__PURE__*/React.lazy(function () {
  return import('./BaseImage');
});
export var imageStyles = /*#__PURE__*/_styled("img", {
  target: "e1xtjyf0",
  label: "imageStyles"
})(process.env.NODE_ENV === "production" ? {
  name: "1hzevmy-imageStyles",
  styles: "height:auto;max-height:100%;max-width:100%;&[src$=\".svg\"]{width:100%;};label:imageStyles;"
} : {
  name: "1hzevmy-imageStyles",
  styles: "height:auto;max-height:100%;max-width:100%;&[src$=\".svg\"]{width:100%;};label:imageStyles;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9QYXVzYWJsZUltYWdlL2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFXRSIsImZpbGUiOiIuLi8uLi9zcmMvUGF1c2FibGVJbWFnZS9pbmRleC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IEJhc2VJbWFnZSA9IFJlYWN0LmxhenkoKCkgPT4gaW1wb3J0KCcuL0Jhc2VJbWFnZScpKTtcblxuaW50ZXJmYWNlIFBhdXNlYWJsZUltYWdlUHJvcHMge1xuICBzcmM6IHN0cmluZztcbiAgYWx0OiBzdHJpbmc7XG59XG5leHBvcnQgY29uc3QgaW1hZ2VTdHlsZXMgPSBzdHlsZWQuaW1nKFxuICBjc3Moe1xuICAgIGhlaWdodDogJ2F1dG8nLFxuICAgIG1heEhlaWdodDogJzEwMCUnLFxuICAgIG1heFdpZHRoOiAnMTAwJScsXG4gICAgJyZbc3JjJD1cIi5zdmdcIl0nOiB7XG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgIH0sXG4gIH0pXG4pO1xuXG5jb25zdCBTdGF0aWNJbWFnZSA9IGltYWdlU3R5bGVzO1xuXG5leHBvcnQgY29uc3QgUGF1c2FibGVJbWFnZTogUmVhY3QuRkM8UGF1c2VhYmxlSW1hZ2VQcm9wcz4gPSAocHJvcHMpID0+IHtcbiAgY29uc3Qgc3RhdGljSW1hZ2UgPSA8U3RhdGljSW1hZ2Ugey4uLnByb3BzfSAvPjtcblxuICAvLyBBdm9pZCByZW5kZXJpbmcgUmVhY3QuU3VzcGVuc2Ugb24gdGhlIHNlcnZlciB1bnRpbCBpdCdzIGZ1bGx5IHN1cHBvcnRlZCBieSBSZWFjdCAmIG91ciBhcHBsaWNhdGlvbnNcbiAgY29uc3QgW2lzTW91bnRlZCwgc2V0SXNNb3VudGVkXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRJc01vdW50ZWQodHJ1ZSk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICB7aXNNb3VudGVkICYmIHByb3BzLnNyYz8uZW5kc1dpdGgoJy5naWYnKSA/IChcbiAgICAgICAgPFJlYWN0LlN1c3BlbnNlIGZhbGxiYWNrPXtzdGF0aWNJbWFnZX0+XG4gICAgICAgICAgPEJhc2VJbWFnZSB7Li4ucHJvcHN9IC8+XG4gICAgICAgIDwvUmVhY3QuU3VzcGVuc2U+XG4gICAgICApIDogKFxuICAgICAgICBzdGF0aWNJbWFnZVxuICAgICAgKX1cbiAgICA8Lz5cbiAgKTtcbn07XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
}, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9QYXVzYWJsZUltYWdlL2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFVMkIiLCJmaWxlIjoiLi4vLi4vc3JjL1BhdXNhYmxlSW1hZ2UvaW5kZXgudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBCYXNlSW1hZ2UgPSBSZWFjdC5sYXp5KCgpID0+IGltcG9ydCgnLi9CYXNlSW1hZ2UnKSk7XG5cbmludGVyZmFjZSBQYXVzZWFibGVJbWFnZVByb3BzIHtcbiAgc3JjOiBzdHJpbmc7XG4gIGFsdDogc3RyaW5nO1xufVxuZXhwb3J0IGNvbnN0IGltYWdlU3R5bGVzID0gc3R5bGVkLmltZyhcbiAgY3NzKHtcbiAgICBoZWlnaHQ6ICdhdXRvJyxcbiAgICBtYXhIZWlnaHQ6ICcxMDAlJyxcbiAgICBtYXhXaWR0aDogJzEwMCUnLFxuICAgICcmW3NyYyQ9XCIuc3ZnXCJdJzoge1xuICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICB9LFxuICB9KVxuKTtcblxuY29uc3QgU3RhdGljSW1hZ2UgPSBpbWFnZVN0eWxlcztcblxuZXhwb3J0IGNvbnN0IFBhdXNhYmxlSW1hZ2U6IFJlYWN0LkZDPFBhdXNlYWJsZUltYWdlUHJvcHM+ID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHN0YXRpY0ltYWdlID0gPFN0YXRpY0ltYWdlIHsuLi5wcm9wc30gLz47XG5cbiAgLy8gQXZvaWQgcmVuZGVyaW5nIFJlYWN0LlN1c3BlbnNlIG9uIHRoZSBzZXJ2ZXIgdW50aWwgaXQncyBmdWxseSBzdXBwb3J0ZWQgYnkgUmVhY3QgJiBvdXIgYXBwbGljYXRpb25zXG4gIGNvbnN0IFtpc01vdW50ZWQsIHNldElzTW91bnRlZF0gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0SXNNb3VudGVkKHRydWUpO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAge2lzTW91bnRlZCAmJiBwcm9wcy5zcmM/LmVuZHNXaXRoKCcuZ2lmJykgPyAoXG4gICAgICAgIDxSZWFjdC5TdXNwZW5zZSBmYWxsYmFjaz17c3RhdGljSW1hZ2V9PlxuICAgICAgICAgIDxCYXNlSW1hZ2Ugey4uLnByb3BzfSAvPlxuICAgICAgICA8L1JlYWN0LlN1c3BlbnNlPlxuICAgICAgKSA6IChcbiAgICAgICAgc3RhdGljSW1hZ2VcbiAgICAgICl9XG4gICAgPC8+XG4gICk7XG59O1xuIl19 */");
var StaticImage = imageStyles;
export var PausableImage = function PausableImage(props) {
  var _props$src;
  var staticImage = /*#__PURE__*/_jsx(StaticImage, _objectSpread({}, props));

  // Avoid rendering React.Suspense on the server until it's fully supported by React & our applications
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    isMounted = _React$useState2[0],
    setIsMounted = _React$useState2[1];
  React.useEffect(function () {
    setIsMounted(true);
  }, []);
  return /*#__PURE__*/_jsx(_Fragment, {
    children: isMounted && (_props$src = props.src) !== null && _props$src !== void 0 && _props$src.endsWith('.gif') ? /*#__PURE__*/_jsx(React.Suspense, {
      fallback: staticImage,
      children: /*#__PURE__*/_jsx(BaseImage, _objectSpread({}, props))
    }) : staticImage
  });
};