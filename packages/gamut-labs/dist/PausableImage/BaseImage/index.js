import _styled from "@emotion/styled/base";

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

import { FillButton, HiddenText } from '@codecademy/gamut';
import { PauseIcon, PlayIcon } from '@codecademy/gamut-icons';
import React, { useState } from 'react';
import Freezeframe from 'react-freezeframe';
import { imageStyles } from '..';
export var Container = _styled("div", {
  target: "e1bj4l191",
  label: "Container"
})(process.env.NODE_ENV === "production" ? {
  name: "1v365f0",
  styles: "align-items:center;justify-content:center;height:100%;display:flex;position:relative;width:100%;>img,>.react-freezeframe,>.react-freezeframe img{max-width:100%;}.ff-container .ff-canvas{transition:none;}.ff-loading-icon::before{display:none;}"
} : {
  name: "1v365f0",
  styles: "align-items:center;justify-content:center;height:100%;display:flex;position:relative;width:100%;>img,>.react-freezeframe,>.react-freezeframe img{max-width:100%;}.ff-container .ff-canvas{transition:none;}.ff-loading-icon::before{display:none;}",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9QYXVzYWJsZUltYWdlL0Jhc2VJbWFnZS9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBYW1DIiwiZmlsZSI6Ii4uLy4uLy4uL3NyYy9QYXVzYWJsZUltYWdlL0Jhc2VJbWFnZS9pbmRleC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGaWxsQnV0dG9uLCBIaWRkZW5UZXh0IH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHsgUGF1c2VJY29uLCBQbGF5SWNvbiB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0LWljb25zJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBGcmVlemVmcmFtZSBmcm9tICdyZWFjdC1mcmVlemVmcmFtZSc7XG5cbmltcG9ydCB7IGltYWdlU3R5bGVzIH0gZnJvbSAnLi4nO1xuXG5leHBvcnQgaW50ZXJmYWNlIEJhc2VJbWFnZVByb3BzIHtcbiAgYWx0OiBzdHJpbmc7XG4gIHNyYzogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGhlaWdodDogMTAwJTtcbiAgZGlzcGxheTogZmxleDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogMTAwJTtcblxuICA+IGltZyxcbiAgPiAucmVhY3QtZnJlZXplZnJhbWUsXG4gID4gLnJlYWN0LWZyZWV6ZWZyYW1lIGltZyB7XG4gICAgbWF4LXdpZHRoOiAxMDAlO1xuICB9XG4gIC5mZi1jb250YWluZXIgLmZmLWNhbnZhcyB7XG4gICAgdHJhbnNpdGlvbjogbm9uZTtcbiAgfVxuICAuZmYtbG9hZGluZy1pY29uOjpiZWZvcmUge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBQbGF5aW5nSW1hZ2UgPSBpbWFnZVN0eWxlcztcblxuY29uc3QgU3R5bGVkRnJlZXplZnJhbWUgPSBzdHlsZWQoRnJlZXplZnJhbWUpKGltYWdlU3R5bGVzKTtcblxuZXhwb3J0IGNvbnN0IEJhc2VJbWFnZTogUmVhY3QuRkM8QmFzZUltYWdlUHJvcHM+ID0gKHsgYWx0LCAuLi5yZXN0IH0pID0+IHtcbiAgY29uc3QgW3BhdXNlZCwgc2V0UGF1c2VkXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBbbGl2ZVRleHQsIGJ1dHRvbkxhYmVsLCBJY29uLCBJbWFnZV0gPSBwYXVzZWRcbiAgICA/IFtgJHthbHR9LCBwYXVzZWRgLCAnUGxheSBhbmltYXRlZCBpbWFnZScsIFBsYXlJY29uLCBTdHlsZWRGcmVlemVmcmFtZV1cbiAgICA6IFtgJHthbHR9LCBwbGF5aW5nYCwgJ1BhdXNlIGFuaW1hdGVkIGltYWdlJywgUGF1c2VJY29uLCBQbGF5aW5nSW1hZ2VdO1xuXG4gIHJldHVybiAoXG4gICAgPENvbnRhaW5lcj5cbiAgICAgIDxJbWFnZSBhbHQ9e2FsdH0gey4uLnJlc3R9IC8+XG4gICAgICB7LyogZW5zdXJlIHByb3BlciBmYWxsIGJhY2sgbGFiZWwgaWYgYW4gZW1wdHkgc3RyaW5nIGlzIGdpdmVuIGFzIGFsdCAqL31cbiAgICAgIDxIaWRkZW5UZXh0IGFyaWEtbGl2ZT1cInBvbGl0ZVwiPnthbHQgPyBsaXZlVGV4dCA6IGJ1dHRvbkxhYmVsfTwvSGlkZGVuVGV4dD5cbiAgICAgIDxGaWxsQnV0dG9uXG4gICAgICAgIGJvdHRvbT17MH1cbiAgICAgICAgbT17OH1cbiAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGF1c2VkKCFwYXVzZWQpfVxuICAgICAgICBwb3NpdGlvbj1cImFic29sdXRlXCJcbiAgICAgICAgcmlnaHQ9ezB9XG4gICAgICAgIHZhcmlhbnQ9XCJzZWNvbmRhcnlcIlxuICAgICAgICB6SW5kZXg9ezF9XG4gICAgICAgIGFyaWEtbGFiZWw9e2J1dHRvbkxhYmVsfVxuICAgICAgPlxuICAgICAgICA8SWNvbiBjb2xvcj1cImN1cnJlbnRDb2xvclwiIC8+XG4gICAgICA8L0ZpbGxCdXR0b24+XG4gICAgPC9Db250YWluZXI+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBCYXNlSW1hZ2U7XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});
export var PlayingImage = imageStyles;

var StyledFreezeframe = /*#__PURE__*/_styled(Freezeframe, {
  target: "e1bj4l190",
  label: "StyledFreezeframe"
})(imageStyles, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9QYXVzYWJsZUltYWdlL0Jhc2VJbWFnZS9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBb0MwQiIsImZpbGUiOiIuLi8uLi8uLi9zcmMvUGF1c2FibGVJbWFnZS9CYXNlSW1hZ2UvaW5kZXgudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmlsbEJ1dHRvbiwgSGlkZGVuVGV4dCB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0JztcbmltcG9ydCB7IFBhdXNlSWNvbiwgUGxheUljb24gfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1pY29ucyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRnJlZXplZnJhbWUgZnJvbSAncmVhY3QtZnJlZXplZnJhbWUnO1xuXG5pbXBvcnQgeyBpbWFnZVN0eWxlcyB9IGZyb20gJy4uJztcblxuZXhwb3J0IGludGVyZmFjZSBCYXNlSW1hZ2VQcm9wcyB7XG4gIGFsdDogc3RyaW5nO1xuICBzcmM6IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IENvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgd2lkdGg6IDEwMCU7XG5cbiAgPiBpbWcsXG4gID4gLnJlYWN0LWZyZWV6ZWZyYW1lLFxuICA+IC5yZWFjdC1mcmVlemVmcmFtZSBpbWcge1xuICAgIG1heC13aWR0aDogMTAwJTtcbiAgfVxuICAuZmYtY29udGFpbmVyIC5mZi1jYW52YXMge1xuICAgIHRyYW5zaXRpb246IG5vbmU7XG4gIH1cbiAgLmZmLWxvYWRpbmctaWNvbjo6YmVmb3JlIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG5gO1xuXG5leHBvcnQgY29uc3QgUGxheWluZ0ltYWdlID0gaW1hZ2VTdHlsZXM7XG5cbmNvbnN0IFN0eWxlZEZyZWV6ZWZyYW1lID0gc3R5bGVkKEZyZWV6ZWZyYW1lKShpbWFnZVN0eWxlcyk7XG5cbmV4cG9ydCBjb25zdCBCYXNlSW1hZ2U6IFJlYWN0LkZDPEJhc2VJbWFnZVByb3BzPiA9ICh7IGFsdCwgLi4ucmVzdCB9KSA9PiB7XG4gIGNvbnN0IFtwYXVzZWQsIHNldFBhdXNlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgW2xpdmVUZXh0LCBidXR0b25MYWJlbCwgSWNvbiwgSW1hZ2VdID0gcGF1c2VkXG4gICAgPyBbYCR7YWx0fSwgcGF1c2VkYCwgJ1BsYXkgYW5pbWF0ZWQgaW1hZ2UnLCBQbGF5SWNvbiwgU3R5bGVkRnJlZXplZnJhbWVdXG4gICAgOiBbYCR7YWx0fSwgcGxheWluZ2AsICdQYXVzZSBhbmltYXRlZCBpbWFnZScsIFBhdXNlSWNvbiwgUGxheWluZ0ltYWdlXTtcblxuICByZXR1cm4gKFxuICAgIDxDb250YWluZXI+XG4gICAgICA8SW1hZ2UgYWx0PXthbHR9IHsuLi5yZXN0fSAvPlxuICAgICAgey8qIGVuc3VyZSBwcm9wZXIgZmFsbCBiYWNrIGxhYmVsIGlmIGFuIGVtcHR5IHN0cmluZyBpcyBnaXZlbiBhcyBhbHQgKi99XG4gICAgICA8SGlkZGVuVGV4dCBhcmlhLWxpdmU9XCJwb2xpdGVcIj57YWx0ID8gbGl2ZVRleHQgOiBidXR0b25MYWJlbH08L0hpZGRlblRleHQ+XG4gICAgICA8RmlsbEJ1dHRvblxuICAgICAgICBib3R0b209ezB9XG4gICAgICAgIG09ezh9XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhdXNlZCghcGF1c2VkKX1cbiAgICAgICAgcG9zaXRpb249XCJhYnNvbHV0ZVwiXG4gICAgICAgIHJpZ2h0PXswfVxuICAgICAgICB2YXJpYW50PVwic2Vjb25kYXJ5XCJcbiAgICAgICAgekluZGV4PXsxfVxuICAgICAgICBhcmlhLWxhYmVsPXtidXR0b25MYWJlbH1cbiAgICAgID5cbiAgICAgICAgPEljb24gY29sb3I9XCJjdXJyZW50Q29sb3JcIiAvPlxuICAgICAgPC9GaWxsQnV0dG9uPlxuICAgIDwvQ29udGFpbmVyPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQmFzZUltYWdlO1xuIl19 */");

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

  return /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Image, _extends({
    alt: alt
  }, rest)), /*#__PURE__*/React.createElement(HiddenText, {
    "aria-live": "polite"
  }, alt ? liveText : buttonLabel), /*#__PURE__*/React.createElement(FillButton, {
    bottom: 0,
    m: 8,
    onClick: function onClick() {
      return setPaused(!paused);
    },
    position: "absolute",
    right: 0,
    variant: "secondary",
    zIndex: 1,
    "aria-label": buttonLabel
  }, /*#__PURE__*/React.createElement(Icon, {
    color: "currentColor"
  })));
};
export default BaseImage;