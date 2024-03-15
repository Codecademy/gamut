import _styled from "@emotion/styled/base";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { Box } from '@codecademy/gamut';
import { SearchIcon } from '@codecademy/gamut-icons';
import { css } from '@codecademy/gamut-styles';
import React, { useState } from 'react';
var SearchForm = Box.withComponent('form', {
  target: "e1soejet2",
  label: "SearchForm"
});

var StyledInput = _styled("input", {
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
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9BcHBIZWFkZXJNb2JpbGUvQXBwSGVhZGVyTWFpbk1lbnVNb2JpbGUvTW9iaWxlU2VhcmNoQmFyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFRb0IiLCJmaWxlIjoiLi4vLi4vLi4vc3JjL0FwcEhlYWRlck1vYmlsZS9BcHBIZWFkZXJNYWluTWVudU1vYmlsZS9Nb2JpbGVTZWFyY2hCYXIudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQm94IH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHsgU2VhcmNoSWNvbiB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0LWljb25zJztcbmltcG9ydCB7IGNzcyB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0LXN0eWxlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IFNlYXJjaEZvcm0gPSBCb3gud2l0aENvbXBvbmVudCgnZm9ybScpO1xuXG5jb25zdCBTdHlsZWRJbnB1dCA9IHN0eWxlZC5pbnB1dChcbiAgY3NzKHtcbiAgICBiYWNrZ3JvdW5kOiBgbm9uZWAsXG4gICAgYm9yZGVyV2lkdGg6IGAxcHhgLFxuICAgIGJvcmRlckNvbG9yOiBgZ3JheS04MDBgLFxuICAgIGNvbG9yOiBgdGV4dGAsXG4gICAgZm9udFNpemU6IDE2LFxuICAgIG91dGxpbmU6IGBub25lYCxcbiAgICBwYWRkaW5nOiBgMC43NXJlbWAsXG4gICAgcGFkZGluZ1JpZ2h0OiBgMi41cmVtYCxcbiAgICB3aWR0aDogYDEwMCVgLFxuXG4gICAgJyY6OnBsYWNlaG9sZGVyJzoge1xuICAgICAgY29sb3I6ICd0ZXh0LWRpc2FibGVkJyxcbiAgICB9LFxuICB9KVxuKTtcblxuY29uc3QgU2VhcmNoQnV0dG9uID0gc3R5bGVkLmJ1dHRvbihcbiAgY3NzKHtcbiAgICBwb3NpdGlvbjogYGFic29sdXRlYCxcbiAgICB0b3A6IGA1MCVgLFxuICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZSgwLCAtNTAlKWAsXG4gICAgcmlnaHQ6IGAwLjc1cmVtYCxcbiAgICBjb2xvcjogYHRleHRgLFxuICAgIGN1cnNvcjogYHBvaW50ZXJgLFxuICAgIG91dGxpbmU6IDAsXG4gICAgYm9yZGVyOiBgbm9uZWAsXG4gICAgYmFja2dyb3VuZENvbG9yOiBgdHJhbnNwYXJlbnRgLFxuICAgIHA6IDAsXG4gICAgbGluZUhlaWdodDogMCxcbiAgfSlcbik7XG5cbmV4cG9ydCB0eXBlIE1vYmlsZVNlYXJjaEJhclByb3BzID0ge1xuICBvblNlYXJjaDogKHF1ZXJ5OiBzdHJpbmcpID0+IHZvaWQ7XG59O1xuXG5leHBvcnQgY29uc3QgTW9iaWxlU2VhcmNoQmFyOiBSZWFjdC5GQzxNb2JpbGVTZWFyY2hCYXJQcm9wcz4gPSAoe1xuICBvblNlYXJjaCxcbn0pID0+IHtcbiAgY29uc3QgW3NlYXJjaFZhbHVlLCBzZXRTZWFyY2hWYWx1ZV0gPSB1c2VTdGF0ZSgnJyk7XG5cbiAgY29uc3QgaGFuZGxlQ2hhbmdlOiBSZWFjdC5DaGFuZ2VFdmVudEhhbmRsZXI8SFRNTElucHV0RWxlbWVudD4gPSAoZXZlbnQpID0+IHtcbiAgICBzZXRTZWFyY2hWYWx1ZShldmVudC50YXJnZXQudmFsdWUpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVN1Ym1pdDogUmVhY3QuRm9ybUV2ZW50SGFuZGxlciA9IChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgb25TZWFyY2goc2VhcmNoVmFsdWUpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPFNlYXJjaEZvcm1cbiAgICAgIGFjdGlvbj1cIi9zZWFyY2hcIlxuICAgICAgZGlzcGxheT1cImZsZXhcIlxuICAgICAgaWQ9XCJzZWFyY2gtZm9ybVwiXG4gICAgICBvblN1Ym1pdD17aGFuZGxlU3VibWl0fVxuICAgICAgcG9zaXRpb249XCJyZWxhdGl2ZVwiXG4gICAgICBweT17MTZ9XG4gICAgICB3aWR0aD1cIjEwMCVcIlxuICAgID5cbiAgICAgIDxTdHlsZWRJbnB1dFxuICAgICAgICBuYW1lPVwicXVlcnlcIlxuICAgICAgICB0eXBlPVwic2VhcmNoXCJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2ggb3VyIGNhdGFsb2dcIlxuICAgICAgICBhcmlhLWxhYmVsPVwic2VhcmNoXCJcbiAgICAgICAgdmFsdWU9e3NlYXJjaFZhbHVlfVxuICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxuICAgICAgLz5cbiAgICAgIDxTZWFyY2hCdXR0b24gYXJpYS1sYWJlbD1cIkVudGVyIHNlYXJjaFwiPlxuICAgICAgICA8U2VhcmNoSWNvbiAvPlxuICAgICAgPC9TZWFyY2hCdXR0b24+XG4gICAgPC9TZWFyY2hGb3JtPlxuICApO1xufTtcbiJdfQ== */");

var SearchButton = _styled("button", {
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
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9BcHBIZWFkZXJNb2JpbGUvQXBwSGVhZGVyTWFpbk1lbnVNb2JpbGUvTW9iaWxlU2VhcmNoQmFyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEwQnFCIiwiZmlsZSI6Ii4uLy4uLy4uL3NyYy9BcHBIZWFkZXJNb2JpbGUvQXBwSGVhZGVyTWFpbk1lbnVNb2JpbGUvTW9iaWxlU2VhcmNoQmFyLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJveCB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0JztcbmltcG9ydCB7IFNlYXJjaEljb24gfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1pY29ucyc7XG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1zdHlsZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5jb25zdCBTZWFyY2hGb3JtID0gQm94LndpdGhDb21wb25lbnQoJ2Zvcm0nKTtcblxuY29uc3QgU3R5bGVkSW5wdXQgPSBzdHlsZWQuaW5wdXQoXG4gIGNzcyh7XG4gICAgYmFja2dyb3VuZDogYG5vbmVgLFxuICAgIGJvcmRlcldpZHRoOiBgMXB4YCxcbiAgICBib3JkZXJDb2xvcjogYGdyYXktODAwYCxcbiAgICBjb2xvcjogYHRleHRgLFxuICAgIGZvbnRTaXplOiAxNixcbiAgICBvdXRsaW5lOiBgbm9uZWAsXG4gICAgcGFkZGluZzogYDAuNzVyZW1gLFxuICAgIHBhZGRpbmdSaWdodDogYDIuNXJlbWAsXG4gICAgd2lkdGg6IGAxMDAlYCxcblxuICAgICcmOjpwbGFjZWhvbGRlcic6IHtcbiAgICAgIGNvbG9yOiAndGV4dC1kaXNhYmxlZCcsXG4gICAgfSxcbiAgfSlcbik7XG5cbmNvbnN0IFNlYXJjaEJ1dHRvbiA9IHN0eWxlZC5idXR0b24oXG4gIGNzcyh7XG4gICAgcG9zaXRpb246IGBhYnNvbHV0ZWAsXG4gICAgdG9wOiBgNTAlYCxcbiAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGUoMCwgLTUwJSlgLFxuICAgIHJpZ2h0OiBgMC43NXJlbWAsXG4gICAgY29sb3I6IGB0ZXh0YCxcbiAgICBjdXJzb3I6IGBwb2ludGVyYCxcbiAgICBvdXRsaW5lOiAwLFxuICAgIGJvcmRlcjogYG5vbmVgLFxuICAgIGJhY2tncm91bmRDb2xvcjogYHRyYW5zcGFyZW50YCxcbiAgICBwOiAwLFxuICAgIGxpbmVIZWlnaHQ6IDAsXG4gIH0pXG4pO1xuXG5leHBvcnQgdHlwZSBNb2JpbGVTZWFyY2hCYXJQcm9wcyA9IHtcbiAgb25TZWFyY2g6IChxdWVyeTogc3RyaW5nKSA9PiB2b2lkO1xufTtcblxuZXhwb3J0IGNvbnN0IE1vYmlsZVNlYXJjaEJhcjogUmVhY3QuRkM8TW9iaWxlU2VhcmNoQmFyUHJvcHM+ID0gKHtcbiAgb25TZWFyY2gsXG59KSA9PiB7XG4gIGNvbnN0IFtzZWFyY2hWYWx1ZSwgc2V0U2VhcmNoVmFsdWVdID0gdXNlU3RhdGUoJycpO1xuXG4gIGNvbnN0IGhhbmRsZUNoYW5nZTogUmVhY3QuQ2hhbmdlRXZlbnRIYW5kbGVyPEhUTUxJbnB1dEVsZW1lbnQ+ID0gKGV2ZW50KSA9PiB7XG4gICAgc2V0U2VhcmNoVmFsdWUoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTdWJtaXQ6IFJlYWN0LkZvcm1FdmVudEhhbmRsZXIgPSAoZXZlbnQpID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIG9uU2VhcmNoKHNlYXJjaFZhbHVlKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxTZWFyY2hGb3JtXG4gICAgICBhY3Rpb249XCIvc2VhcmNoXCJcbiAgICAgIGRpc3BsYXk9XCJmbGV4XCJcbiAgICAgIGlkPVwic2VhcmNoLWZvcm1cIlxuICAgICAgb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH1cbiAgICAgIHBvc2l0aW9uPVwicmVsYXRpdmVcIlxuICAgICAgcHk9ezE2fVxuICAgICAgd2lkdGg9XCIxMDAlXCJcbiAgICA+XG4gICAgICA8U3R5bGVkSW5wdXRcbiAgICAgICAgbmFtZT1cInF1ZXJ5XCJcbiAgICAgICAgdHlwZT1cInNlYXJjaFwiXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIG91ciBjYXRhbG9nXCJcbiAgICAgICAgYXJpYS1sYWJlbD1cInNlYXJjaFwiXG4gICAgICAgIHZhbHVlPXtzZWFyY2hWYWx1ZX1cbiAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cbiAgICAgIC8+XG4gICAgICA8U2VhcmNoQnV0dG9uIGFyaWEtbGFiZWw9XCJFbnRlciBzZWFyY2hcIj5cbiAgICAgICAgPFNlYXJjaEljb24gLz5cbiAgICAgIDwvU2VhcmNoQnV0dG9uPlxuICAgIDwvU2VhcmNoRm9ybT5cbiAgKTtcbn07XG4iXX0= */");

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

  return /*#__PURE__*/React.createElement(SearchForm, {
    action: "/search",
    display: "flex",
    id: "search-form",
    onSubmit: handleSubmit,
    position: "relative",
    py: 16,
    width: "100%"
  }, /*#__PURE__*/React.createElement(StyledInput, {
    name: "query",
    type: "search",
    placeholder: "Search our catalog",
    "aria-label": "search",
    value: searchValue,
    onChange: handleChange
  }), /*#__PURE__*/React.createElement(SearchButton, {
    "aria-label": "Enter search"
  }, /*#__PURE__*/React.createElement(SearchIcon, null)));
};