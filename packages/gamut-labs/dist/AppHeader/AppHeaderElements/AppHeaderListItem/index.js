function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
import _styled from "@emotion/styled/base";
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import { Box } from '@codecademy/gamut';
import { css } from '@codecademy/gamut-styles';
import * as React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
export var StyledListItem = /*#__PURE__*/_styled(Box, {
  target: "eargl5z0",
  label: "StyledListItem"
})(css({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  position: "relative",
  '&:first-of-type': {
    ml: {
      md: 0
    }
  },
  '&:last-of-type': {
    mr: {
      md: 0
    }
  }
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9BcHBIZWFkZXIvQXBwSGVhZGVyRWxlbWVudHMvQXBwSGVhZGVyTGlzdEl0ZW0vaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUs4QiIsImZpbGUiOiIuLi8uLi8uLi8uLi9zcmMvQXBwSGVhZGVyL0FwcEhlYWRlckVsZW1lbnRzL0FwcEhlYWRlckxpc3RJdGVtL2luZGV4LnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJveCwgQm94UHJvcHMgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dCc7XG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1zdHlsZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgY29uc3QgU3R5bGVkTGlzdEl0ZW0gPSBzdHlsZWQoQm94KShcbiAgY3NzKHtcbiAgICBkaXNwbGF5OiBgZmxleGAsXG4gICAganVzdGlmeUNvbnRlbnQ6IGBjZW50ZXJgLFxuICAgIGZsZXhEaXJlY3Rpb246IGBjb2x1bW5gLFxuICAgIHBvc2l0aW9uOiBgcmVsYXRpdmVgLFxuXG4gICAgJyY6Zmlyc3Qtb2YtdHlwZSc6IHtcbiAgICAgIG1sOiB7IG1kOiAwIH0sXG4gICAgfSxcbiAgICAnJjpsYXN0LW9mLXR5cGUnOiB7XG4gICAgICBtcjogeyBtZDogMCB9LFxuICAgIH0sXG4gIH0pXG4pO1xuXG50eXBlIEFwcEhlYWRlckxpc3RJdGVtUHJvcHMgPSB7XG4gIG9uQmx1cj86ICgpID0+IHZvaWQ7XG4gIG9uRm9jdXM/OiAoKSA9PiB2b2lkO1xufSAmIEJveFByb3BzO1xuXG5leHBvcnQgY29uc3QgQXBwSGVhZGVyTGlzdEl0ZW06IFJlYWN0LkZDPEFwcEhlYWRlckxpc3RJdGVtUHJvcHM+ID0gKHtcbiAgY2hpbGRyZW4sXG4gIC4uLnByb3BzXG59KSA9PiAoXG4gIDxTdHlsZWRMaXN0SXRlbSBhcz1cImxpXCIgcm9sZT1cIm5vbmVcIiB7Li4ucHJvcHN9PlxuICAgIHtjaGlsZHJlbn1cbiAgPC9TdHlsZWRMaXN0SXRlbT5cbik7XG4iXX0= */");
export var AppHeaderListItem = function AppHeaderListItem(_ref) {
  var children = _ref.children,
    props = _objectWithoutProperties(_ref, ["children"]);
  return /*#__PURE__*/_jsx(StyledListItem, _objectSpread(_objectSpread({
    as: "li",
    role: "none"
  }, props), {}, {
    children: children
  }));
};