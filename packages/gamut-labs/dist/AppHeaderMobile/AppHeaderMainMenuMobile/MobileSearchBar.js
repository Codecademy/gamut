import _styled from "@emotion/styled/base";
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { Box } from '@codecademy/gamut';
import { SearchIcon } from '@codecademy/gamut-icons';
import { css } from '@codecademy/gamut-styles';
import { useState } from 'react';
import * as React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var SearchForm = Box.withComponent('form', {
  target: "e1soejet2",
  label: "SearchForm"
});
var StyledInput = /*#__PURE__*/_styled("input", {
  target: "e1soejet1",
  label: "StyledInput"
})(css({
  background: "none",
  borderWidth: "1px",
  borderColor: "gray-800",
  color: "text",
  fontSize: 16,
  outline: "none",
  padding: "0.75rem",
  paddingRight: "2.5rem",
  width: "100%",
  '&::placeholder': {
    color: 'text-disabled'
  }
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9BcHBIZWFkZXJNb2JpbGUvQXBwSGVhZGVyTWFpbk1lbnVNb2JpbGUvTW9iaWxlU2VhcmNoQmFyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFTb0IiLCJmaWxlIjoiLi4vLi4vLi4vc3JjL0FwcEhlYWRlck1vYmlsZS9BcHBIZWFkZXJNYWluTWVudU1vYmlsZS9Nb2JpbGVTZWFyY2hCYXIudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQm94IH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHsgU2VhcmNoSWNvbiB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0LWljb25zJztcbmltcG9ydCB7IGNzcyB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0LXN0eWxlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY29uc3QgU2VhcmNoRm9ybSA9IEJveC53aXRoQ29tcG9uZW50KCdmb3JtJyk7XG5cbmNvbnN0IFN0eWxlZElucHV0ID0gc3R5bGVkLmlucHV0KFxuICBjc3Moe1xuICAgIGJhY2tncm91bmQ6IGBub25lYCxcbiAgICBib3JkZXJXaWR0aDogYDFweGAsXG4gICAgYm9yZGVyQ29sb3I6IGBncmF5LTgwMGAsXG4gICAgY29sb3I6IGB0ZXh0YCxcbiAgICBmb250U2l6ZTogMTYsXG4gICAgb3V0bGluZTogYG5vbmVgLFxuICAgIHBhZGRpbmc6IGAwLjc1cmVtYCxcbiAgICBwYWRkaW5nUmlnaHQ6IGAyLjVyZW1gLFxuICAgIHdpZHRoOiBgMTAwJWAsXG5cbiAgICAnJjo6cGxhY2Vob2xkZXInOiB7XG4gICAgICBjb2xvcjogJ3RleHQtZGlzYWJsZWQnLFxuICAgIH0sXG4gIH0pXG4pO1xuXG5jb25zdCBTZWFyY2hCdXR0b24gPSBzdHlsZWQuYnV0dG9uKFxuICBjc3Moe1xuICAgIHBvc2l0aW9uOiBgYWJzb2x1dGVgLFxuICAgIHRvcDogYDUwJWAsXG4gICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlKDAsIC01MCUpYCxcbiAgICByaWdodDogYDAuNzVyZW1gLFxuICAgIGNvbG9yOiBgdGV4dGAsXG4gICAgY3Vyc29yOiBgcG9pbnRlcmAsXG4gICAgb3V0bGluZTogMCxcbiAgICBib3JkZXI6IGBub25lYCxcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IGB0cmFuc3BhcmVudGAsXG4gICAgcDogMCxcbiAgICBsaW5lSGVpZ2h0OiAwLFxuICB9KVxuKTtcblxuZXhwb3J0IHR5cGUgTW9iaWxlU2VhcmNoQmFyUHJvcHMgPSB7XG4gIG9uU2VhcmNoOiAocXVlcnk6IHN0cmluZykgPT4gdm9pZDtcbn07XG5cbmV4cG9ydCBjb25zdCBNb2JpbGVTZWFyY2hCYXI6IFJlYWN0LkZDPE1vYmlsZVNlYXJjaEJhclByb3BzPiA9ICh7XG4gIG9uU2VhcmNoLFxufSkgPT4ge1xuICBjb25zdCBbc2VhcmNoVmFsdWUsIHNldFNlYXJjaFZhbHVlXSA9IHVzZVN0YXRlKCcnKTtcblxuICBjb25zdCBoYW5kbGVDaGFuZ2U6IFJlYWN0LkNoYW5nZUV2ZW50SGFuZGxlcjxIVE1MSW5wdXRFbGVtZW50PiA9IChldmVudCkgPT4ge1xuICAgIHNldFNlYXJjaFZhbHVlKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU3VibWl0OiBSZWFjdC5Gb3JtRXZlbnRIYW5kbGVyID0gKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBvblNlYXJjaChzZWFyY2hWYWx1ZSk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8U2VhcmNoRm9ybVxuICAgICAgYWN0aW9uPVwiL3NlYXJjaFwiXG4gICAgICBkaXNwbGF5PVwiZmxleFwiXG4gICAgICBpZD1cInNlYXJjaC1mb3JtXCJcbiAgICAgIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9XG4gICAgICBwb3NpdGlvbj1cInJlbGF0aXZlXCJcbiAgICAgIHB5PXsxNn1cbiAgICAgIHdpZHRoPVwiMTAwJVwiXG4gICAgPlxuICAgICAgPFN0eWxlZElucHV0XG4gICAgICAgIG5hbWU9XCJxdWVyeVwiXG4gICAgICAgIHR5cGU9XCJzZWFyY2hcIlxuICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCBvdXIgY2F0YWxvZ1wiXG4gICAgICAgIGFyaWEtbGFiZWw9XCJzZWFyY2hcIlxuICAgICAgICB2YWx1ZT17c2VhcmNoVmFsdWV9XG4gICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVDaGFuZ2V9XG4gICAgICAvPlxuICAgICAgPFNlYXJjaEJ1dHRvbiBhcmlhLWxhYmVsPVwiRW50ZXIgc2VhcmNoXCI+XG4gICAgICAgIDxTZWFyY2hJY29uIC8+XG4gICAgICA8L1NlYXJjaEJ1dHRvbj5cbiAgICA8L1NlYXJjaEZvcm0+XG4gICk7XG59O1xuIl19 */");
var SearchButton = /*#__PURE__*/_styled("button", {
  target: "e1soejet0",
  label: "SearchButton"
})(css({
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  right: "0.75rem",
  color: "text",
  cursor: "pointer",
  outline: 0,
  border: "none",
  backgroundColor: "transparent",
  p: 0,
  lineHeight: 0
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9BcHBIZWFkZXJNb2JpbGUvQXBwSGVhZGVyTWFpbk1lbnVNb2JpbGUvTW9iaWxlU2VhcmNoQmFyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEyQnFCIiwiZmlsZSI6Ii4uLy4uLy4uL3NyYy9BcHBIZWFkZXJNb2JpbGUvQXBwSGVhZGVyTWFpbk1lbnVNb2JpbGUvTW9iaWxlU2VhcmNoQmFyLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJveCB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0JztcbmltcG9ydCB7IFNlYXJjaEljb24gfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1pY29ucyc7XG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1zdHlsZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IFNlYXJjaEZvcm0gPSBCb3gud2l0aENvbXBvbmVudCgnZm9ybScpO1xuXG5jb25zdCBTdHlsZWRJbnB1dCA9IHN0eWxlZC5pbnB1dChcbiAgY3NzKHtcbiAgICBiYWNrZ3JvdW5kOiBgbm9uZWAsXG4gICAgYm9yZGVyV2lkdGg6IGAxcHhgLFxuICAgIGJvcmRlckNvbG9yOiBgZ3JheS04MDBgLFxuICAgIGNvbG9yOiBgdGV4dGAsXG4gICAgZm9udFNpemU6IDE2LFxuICAgIG91dGxpbmU6IGBub25lYCxcbiAgICBwYWRkaW5nOiBgMC43NXJlbWAsXG4gICAgcGFkZGluZ1JpZ2h0OiBgMi41cmVtYCxcbiAgICB3aWR0aDogYDEwMCVgLFxuXG4gICAgJyY6OnBsYWNlaG9sZGVyJzoge1xuICAgICAgY29sb3I6ICd0ZXh0LWRpc2FibGVkJyxcbiAgICB9LFxuICB9KVxuKTtcblxuY29uc3QgU2VhcmNoQnV0dG9uID0gc3R5bGVkLmJ1dHRvbihcbiAgY3NzKHtcbiAgICBwb3NpdGlvbjogYGFic29sdXRlYCxcbiAgICB0b3A6IGA1MCVgLFxuICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZSgwLCAtNTAlKWAsXG4gICAgcmlnaHQ6IGAwLjc1cmVtYCxcbiAgICBjb2xvcjogYHRleHRgLFxuICAgIGN1cnNvcjogYHBvaW50ZXJgLFxuICAgIG91dGxpbmU6IDAsXG4gICAgYm9yZGVyOiBgbm9uZWAsXG4gICAgYmFja2dyb3VuZENvbG9yOiBgdHJhbnNwYXJlbnRgLFxuICAgIHA6IDAsXG4gICAgbGluZUhlaWdodDogMCxcbiAgfSlcbik7XG5cbmV4cG9ydCB0eXBlIE1vYmlsZVNlYXJjaEJhclByb3BzID0ge1xuICBvblNlYXJjaDogKHF1ZXJ5OiBzdHJpbmcpID0+IHZvaWQ7XG59O1xuXG5leHBvcnQgY29uc3QgTW9iaWxlU2VhcmNoQmFyOiBSZWFjdC5GQzxNb2JpbGVTZWFyY2hCYXJQcm9wcz4gPSAoe1xuICBvblNlYXJjaCxcbn0pID0+IHtcbiAgY29uc3QgW3NlYXJjaFZhbHVlLCBzZXRTZWFyY2hWYWx1ZV0gPSB1c2VTdGF0ZSgnJyk7XG5cbiAgY29uc3QgaGFuZGxlQ2hhbmdlOiBSZWFjdC5DaGFuZ2VFdmVudEhhbmRsZXI8SFRNTElucHV0RWxlbWVudD4gPSAoZXZlbnQpID0+IHtcbiAgICBzZXRTZWFyY2hWYWx1ZShldmVudC50YXJnZXQudmFsdWUpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVN1Ym1pdDogUmVhY3QuRm9ybUV2ZW50SGFuZGxlciA9IChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgb25TZWFyY2goc2VhcmNoVmFsdWUpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPFNlYXJjaEZvcm1cbiAgICAgIGFjdGlvbj1cIi9zZWFyY2hcIlxuICAgICAgZGlzcGxheT1cImZsZXhcIlxuICAgICAgaWQ9XCJzZWFyY2gtZm9ybVwiXG4gICAgICBvblN1Ym1pdD17aGFuZGxlU3VibWl0fVxuICAgICAgcG9zaXRpb249XCJyZWxhdGl2ZVwiXG4gICAgICBweT17MTZ9XG4gICAgICB3aWR0aD1cIjEwMCVcIlxuICAgID5cbiAgICAgIDxTdHlsZWRJbnB1dFxuICAgICAgICBuYW1lPVwicXVlcnlcIlxuICAgICAgICB0eXBlPVwic2VhcmNoXCJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2ggb3VyIGNhdGFsb2dcIlxuICAgICAgICBhcmlhLWxhYmVsPVwic2VhcmNoXCJcbiAgICAgICAgdmFsdWU9e3NlYXJjaFZhbHVlfVxuICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxuICAgICAgLz5cbiAgICAgIDxTZWFyY2hCdXR0b24gYXJpYS1sYWJlbD1cIkVudGVyIHNlYXJjaFwiPlxuICAgICAgICA8U2VhcmNoSWNvbiAvPlxuICAgICAgPC9TZWFyY2hCdXR0b24+XG4gICAgPC9TZWFyY2hGb3JtPlxuICApO1xufTtcbiJdfQ== */");
export var MobileSearchBar = function MobileSearchBar(_ref) {
  var onSearch = _ref.onSearch;
  var _useState = useState(''),
    _useState2 = _slicedToArray(_useState, 2),
    searchValue = _useState2[0],
    setSearchValue = _useState2[1];
  var handleChange = function handleChange(event) {
    setSearchValue(event.target.value);
  };
  var handleSubmit = function handleSubmit(event) {
    event.preventDefault();
    onSearch(searchValue);
  };
  return /*#__PURE__*/_jsxs(SearchForm, {
    action: "/search",
    display: "flex",
    id: "search-form",
    onSubmit: handleSubmit,
    position: "relative",
    py: 16,
    width: "100%",
    children: [/*#__PURE__*/_jsx(StyledInput, {
      name: "query",
      type: "search",
      placeholder: "Search our catalog",
      "aria-label": "search",
      value: searchValue,
      onChange: handleChange
    }), /*#__PURE__*/_jsx(SearchButton, {
      "aria-label": "Enter search",
      children: /*#__PURE__*/_jsx(SearchIcon, {})
    })]
  });
};