function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
import _styled from "@emotion/styled/base";
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
import { Box } from '@codecademy/gamut';
import React from 'react';
import { SectionItemLink } from './SectionItemLink';
import { jsx as _jsx } from "react/jsx-runtime";
var StyledBox = /*#__PURE__*/_styled(Box, {
  target: "elhym8m0",
  label: "StyledBox"
})(process.env.NODE_ENV === "production" ? {
  name: "qr8q5p",
  styles: "list-style:none"
} : {
  name: "qr8q5p",
  styles: "list-style:none",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9MYXlvdXRNZW51VmFyaWFudC9MYXlvdXRNZW51U2VjdGlvbi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZ0I2QiIsImZpbGUiOiIuLi8uLi9zcmMvTGF5b3V0TWVudVZhcmlhbnQvTGF5b3V0TWVudVNlY3Rpb24udHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQm94IH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHsgc3lzdGVtIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtc3R5bGVzJztcbmltcG9ydCB7IFN0eWxlUHJvcHMgfSBmcm9tICdAY29kZWNhZGVteS92YXJpYW5jZSc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBTZWN0aW9uSXRlbSB9IGZyb20gJy4vQWNjb3JkaW9uTWVudSc7XG5pbXBvcnQgeyBTZWN0aW9uSXRlbUxpbmsgfSBmcm9tICcuL1NlY3Rpb25JdGVtTGluayc7XG5cbmV4cG9ydCB0eXBlIExheW91dE1lbnVTZWN0aW9uU3R5bGVzID0gU3R5bGVQcm9wczx0eXBlb2Ygc3lzdGVtLnNwYWNlPjtcblxuZXhwb3J0IHR5cGUgTGF5b3V0TWVudVNlY3Rpb25Qcm9wcyA9IExheW91dE1lbnVTZWN0aW9uU3R5bGVzICYge1xuICBpdGVtczogU2VjdGlvbkl0ZW1bXTtcbiAgb25JdGVtQ2xpY2s6ICgpID0+IHZvaWQ7XG59O1xuXG5jb25zdCBTdHlsZWRCb3ggPSBzdHlsZWQoQm94KWBcbiAgbGlzdC1zdHlsZTogbm9uZTtcbmA7XG5leHBvcnQgY29uc3QgTGF5b3V0TWVudVNlY3Rpb246IFJlYWN0LkZDPExheW91dE1lbnVTZWN0aW9uUHJvcHM+ID0gKHtcbiAgaXRlbXMsXG4gIG9uSXRlbUNsaWNrLFxuICAuLi5zdHlsZVByb3BzXG59KSA9PiAoXG4gIDxCb3ggey4uLnN0eWxlUHJvcHN9IGFzPVwibWVudVwiIHB4PXs0fSBtPXswfT5cbiAgICB7aXRlbXMubWFwKChpdGVtKSA9PiAoXG4gICAgICA8U3R5bGVkQm94IGtleT17aXRlbS5zbHVnfSBhcz1cImxpXCI+XG4gICAgICAgIDxTZWN0aW9uSXRlbUxpbmtcbiAgICAgICAgICBocmVmPXtpdGVtLmhyZWZ9XG4gICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpdGVtLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICAgICAgb25JdGVtQ2xpY2soKTtcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAge2l0ZW0udGl0bGV9XG4gICAgICAgIDwvU2VjdGlvbkl0ZW1MaW5rPlxuICAgICAgPC9TdHlsZWRCb3g+XG4gICAgKSl9XG4gIDwvQm94PlxuKTtcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});
export var LayoutMenuSection = function LayoutMenuSection(_ref) {
  var items = _ref.items,
    onItemClick = _ref.onItemClick,
    styleProps = _objectWithoutProperties(_ref, ["items", "onItemClick"]);
  return /*#__PURE__*/_jsx(Box, _objectSpread(_objectSpread({}, styleProps), {}, {
    as: "menu",
    px: 4,
    m: 0,
    children: items.map(function (item) {
      return /*#__PURE__*/_jsx(StyledBox, {
        as: "li",
        children: /*#__PURE__*/_jsx(SectionItemLink, {
          href: item.href,
          onClick: function onClick(event) {
            item.onClick(event);
            onItemClick();
          },
          children: item.title
        })
      }, item.slug);
    })
  }));
};