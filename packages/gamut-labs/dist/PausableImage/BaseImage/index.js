function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
import _styled from "@emotion/styled/base";
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
import { FillButton, HiddenText } from '@codecademy/gamut';
import { PauseIcon, PlayIcon } from '@codecademy/gamut-icons';
import { useState } from 'react';
import * as React from 'react';
import Freezeframe from 'react-freezeframe';
import { imageStyles } from '..';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var Container = /*#__PURE__*/_styled("div", {
  target: "e1bj4l191",
  label: "Container"
})(process.env.NODE_ENV === "production" ? {
  name: "1v365f0",
  styles: "align-items:center;justify-content:center;height:100%;display:flex;position:relative;width:100%;>img,>.react-freezeframe,>.react-freezeframe img{max-width:100%;}.ff-container .ff-canvas{transition:none;}.ff-loading-icon::before{display:none;}"
} : {
  name: "1v365f0",
  styles: "align-items:center;justify-content:center;height:100%;display:flex;position:relative;width:100%;>img,>.react-freezeframe,>.react-freezeframe img{max-width:100%;}.ff-container .ff-canvas{transition:none;}.ff-loading-icon::before{display:none;}",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9QYXVzYWJsZUltYWdlL0Jhc2VJbWFnZS9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBY21DIiwiZmlsZSI6Ii4uLy4uLy4uL3NyYy9QYXVzYWJsZUltYWdlL0Jhc2VJbWFnZS9pbmRleC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGaWxsQnV0dG9uLCBIaWRkZW5UZXh0IH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHsgUGF1c2VJY29uLCBQbGF5SWNvbiB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0LWljb25zJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEZyZWV6ZWZyYW1lIGZyb20gJ3JlYWN0LWZyZWV6ZWZyYW1lJztcblxuaW1wb3J0IHsgaW1hZ2VTdHlsZXMgfSBmcm9tICcuLic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmFzZUltYWdlUHJvcHMge1xuICBhbHQ6IHN0cmluZztcbiAgc3JjOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgaGVpZ2h0OiAxMDAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdpZHRoOiAxMDAlO1xuXG4gID4gaW1nLFxuICA+IC5yZWFjdC1mcmVlemVmcmFtZSxcbiAgPiAucmVhY3QtZnJlZXplZnJhbWUgaW1nIHtcbiAgICBtYXgtd2lkdGg6IDEwMCU7XG4gIH1cbiAgLmZmLWNvbnRhaW5lciAuZmYtY2FudmFzIHtcbiAgICB0cmFuc2l0aW9uOiBub25lO1xuICB9XG4gIC5mZi1sb2FkaW5nLWljb246OmJlZm9yZSB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFBsYXlpbmdJbWFnZSA9IGltYWdlU3R5bGVzO1xuXG5jb25zdCBTdHlsZWRGcmVlemVmcmFtZSA9IHN0eWxlZChGcmVlemVmcmFtZSkoaW1hZ2VTdHlsZXMpO1xuXG5leHBvcnQgY29uc3QgQmFzZUltYWdlOiBSZWFjdC5GQzxCYXNlSW1hZ2VQcm9wcz4gPSAoeyBhbHQsIC4uLnJlc3QgfSkgPT4ge1xuICBjb25zdCBbcGF1c2VkLCBzZXRQYXVzZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IFtsaXZlVGV4dCwgYnV0dG9uTGFiZWwsIEljb24sIEltYWdlXSA9IHBhdXNlZFxuICAgID8gW2Ake2FsdH0sIHBhdXNlZGAsICdQbGF5IGFuaW1hdGVkIGltYWdlJywgUGxheUljb24sIFN0eWxlZEZyZWV6ZWZyYW1lXVxuICAgIDogW2Ake2FsdH0sIHBsYXlpbmdgLCAnUGF1c2UgYW5pbWF0ZWQgaW1hZ2UnLCBQYXVzZUljb24sIFBsYXlpbmdJbWFnZV07XG5cbiAgcmV0dXJuIChcbiAgICA8Q29udGFpbmVyPlxuICAgICAgPEltYWdlIGFsdD17YWx0fSB7Li4ucmVzdH0gLz5cbiAgICAgIHsvKiBlbnN1cmUgcHJvcGVyIGZhbGwgYmFjayBsYWJlbCBpZiBhbiBlbXB0eSBzdHJpbmcgaXMgZ2l2ZW4gYXMgYWx0ICovfVxuICAgICAgPEhpZGRlblRleHQgYXJpYS1saXZlPVwicG9saXRlXCI+e2FsdCA/IGxpdmVUZXh0IDogYnV0dG9uTGFiZWx9PC9IaWRkZW5UZXh0PlxuICAgICAgPEZpbGxCdXR0b25cbiAgICAgICAgYm90dG9tPXswfVxuICAgICAgICBtPXs4fVxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYXVzZWQoIXBhdXNlZCl9XG4gICAgICAgIHBvc2l0aW9uPVwiYWJzb2x1dGVcIlxuICAgICAgICByaWdodD17MH1cbiAgICAgICAgdmFyaWFudD1cInNlY29uZGFyeVwiXG4gICAgICAgIHpJbmRleD17MX1cbiAgICAgICAgYXJpYS1sYWJlbD17YnV0dG9uTGFiZWx9XG4gICAgICA+XG4gICAgICAgIDxJY29uIGNvbG9yPVwiY3VycmVudENvbG9yXCIgLz5cbiAgICAgIDwvRmlsbEJ1dHRvbj5cbiAgICA8L0NvbnRhaW5lcj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VJbWFnZTtcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});
export var PlayingImage = imageStyles;
var StyledFreezeframe = /*#__PURE__*/_styled(Freezeframe, {
  target: "e1bj4l190",
  label: "StyledFreezeframe"
})(imageStyles, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9QYXVzYWJsZUltYWdlL0Jhc2VJbWFnZS9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBcUMwQiIsImZpbGUiOiIuLi8uLi8uLi9zcmMvUGF1c2FibGVJbWFnZS9CYXNlSW1hZ2UvaW5kZXgudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmlsbEJ1dHRvbiwgSGlkZGVuVGV4dCB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0JztcbmltcG9ydCB7IFBhdXNlSWNvbiwgUGxheUljb24gfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1pY29ucyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBGcmVlemVmcmFtZSBmcm9tICdyZWFjdC1mcmVlemVmcmFtZSc7XG5cbmltcG9ydCB7IGltYWdlU3R5bGVzIH0gZnJvbSAnLi4nO1xuXG5leHBvcnQgaW50ZXJmYWNlIEJhc2VJbWFnZVByb3BzIHtcbiAgYWx0OiBzdHJpbmc7XG4gIHNyYzogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGhlaWdodDogMTAwJTtcbiAgZGlzcGxheTogZmxleDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogMTAwJTtcblxuICA+IGltZyxcbiAgPiAucmVhY3QtZnJlZXplZnJhbWUsXG4gID4gLnJlYWN0LWZyZWV6ZWZyYW1lIGltZyB7XG4gICAgbWF4LXdpZHRoOiAxMDAlO1xuICB9XG4gIC5mZi1jb250YWluZXIgLmZmLWNhbnZhcyB7XG4gICAgdHJhbnNpdGlvbjogbm9uZTtcbiAgfVxuICAuZmYtbG9hZGluZy1pY29uOjpiZWZvcmUge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBQbGF5aW5nSW1hZ2UgPSBpbWFnZVN0eWxlcztcblxuY29uc3QgU3R5bGVkRnJlZXplZnJhbWUgPSBzdHlsZWQoRnJlZXplZnJhbWUpKGltYWdlU3R5bGVzKTtcblxuZXhwb3J0IGNvbnN0IEJhc2VJbWFnZTogUmVhY3QuRkM8QmFzZUltYWdlUHJvcHM+ID0gKHsgYWx0LCAuLi5yZXN0IH0pID0+IHtcbiAgY29uc3QgW3BhdXNlZCwgc2V0UGF1c2VkXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBbbGl2ZVRleHQsIGJ1dHRvbkxhYmVsLCBJY29uLCBJbWFnZV0gPSBwYXVzZWRcbiAgICA/IFtgJHthbHR9LCBwYXVzZWRgLCAnUGxheSBhbmltYXRlZCBpbWFnZScsIFBsYXlJY29uLCBTdHlsZWRGcmVlemVmcmFtZV1cbiAgICA6IFtgJHthbHR9LCBwbGF5aW5nYCwgJ1BhdXNlIGFuaW1hdGVkIGltYWdlJywgUGF1c2VJY29uLCBQbGF5aW5nSW1hZ2VdO1xuXG4gIHJldHVybiAoXG4gICAgPENvbnRhaW5lcj5cbiAgICAgIDxJbWFnZSBhbHQ9e2FsdH0gey4uLnJlc3R9IC8+XG4gICAgICB7LyogZW5zdXJlIHByb3BlciBmYWxsIGJhY2sgbGFiZWwgaWYgYW4gZW1wdHkgc3RyaW5nIGlzIGdpdmVuIGFzIGFsdCAqL31cbiAgICAgIDxIaWRkZW5UZXh0IGFyaWEtbGl2ZT1cInBvbGl0ZVwiPnthbHQgPyBsaXZlVGV4dCA6IGJ1dHRvbkxhYmVsfTwvSGlkZGVuVGV4dD5cbiAgICAgIDxGaWxsQnV0dG9uXG4gICAgICAgIGJvdHRvbT17MH1cbiAgICAgICAgbT17OH1cbiAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGF1c2VkKCFwYXVzZWQpfVxuICAgICAgICBwb3NpdGlvbj1cImFic29sdXRlXCJcbiAgICAgICAgcmlnaHQ9ezB9XG4gICAgICAgIHZhcmlhbnQ9XCJzZWNvbmRhcnlcIlxuICAgICAgICB6SW5kZXg9ezF9XG4gICAgICAgIGFyaWEtbGFiZWw9e2J1dHRvbkxhYmVsfVxuICAgICAgPlxuICAgICAgICA8SWNvbiBjb2xvcj1cImN1cnJlbnRDb2xvclwiIC8+XG4gICAgICA8L0ZpbGxCdXR0b24+XG4gICAgPC9Db250YWluZXI+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBCYXNlSW1hZ2U7XG4iXX0= */");
export var BaseImage = function BaseImage(_ref) {
  var alt = _ref.alt,
    rest = _objectWithoutProperties(_ref, ["alt"]);
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    paused = _useState2[0],
    setPaused = _useState2[1];
  var _ref2 = paused ? ["".concat(alt, ", paused"), 'Play animated image', PlayIcon, StyledFreezeframe] : ["".concat(alt, ", playing"), 'Pause animated image', PauseIcon, PlayingImage],
    _ref3 = _slicedToArray(_ref2, 4),
    liveText = _ref3[0],
    buttonLabel = _ref3[1],
    Icon = _ref3[2],
    Image = _ref3[3];
  return /*#__PURE__*/_jsxs(Container, {
    children: [/*#__PURE__*/_jsx(Image, _objectSpread({
      alt: alt
    }, rest)), /*#__PURE__*/_jsx(HiddenText, {
      "aria-live": "polite",
      children: alt ? liveText : buttonLabel
    }), /*#__PURE__*/_jsx(FillButton, {
      bottom: 0,
      m: 8,
      onClick: function onClick() {
        return setPaused(!paused);
      },
      position: "absolute",
      right: 0,
      variant: "secondary",
      zIndex: 1,
      "aria-label": buttonLabel,
      children: /*#__PURE__*/_jsx(Icon, {
        color: "currentColor"
      })
    })]
  });
};
export default BaseImage;