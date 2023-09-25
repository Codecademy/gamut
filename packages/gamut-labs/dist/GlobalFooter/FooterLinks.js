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
import { Anchor, Box } from '@codecademy/gamut';
import { theme } from '@codecademy/gamut-styles';
import { useCallback } from 'react';
import * as React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
export var FooterLinkItems = /*#__PURE__*/_styled(Box, {
  target: "e14jx4vs1",
  label: "FooterLinkItems"
})(process.env.NODE_ENV === "production" ? {
  name: "ffhm6p",
  styles: "list-style-type:none"
} : {
  name: "ffhm6p",
  styles: "list-style-type:none",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9HbG9iYWxGb290ZXIvRm9vdGVyTGlua3MudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVEwQyIsImZpbGUiOiIuLi8uLi9zcmMvR2xvYmFsRm9vdGVyL0Zvb3RlckxpbmtzLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuY2hvciwgQm94IH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHsgdGhlbWUgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1zdHlsZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgQ29tcG9uZW50UHJvcHMsIHVzZUNhbGxiYWNrIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBHbG9iYWxGb290ZXJDbGlja0hhbmRsZXIgfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGNvbnN0IEZvb3RlckxpbmtJdGVtcyA9IHN0eWxlZChCb3gpYFxuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XG5gO1xuXG5Gb290ZXJMaW5rSXRlbXMuZGVmYXVsdFByb3BzID0ge1xuICBhczogJ3VsJyxcbiAgcGw6IDAsXG4gIG1iOiAwLFxufTtcblxuZXhwb3J0IGNvbnN0IEZvb3RlckxpbmtJdGVtID0gc3R5bGVkLmxpYFxuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBtYXJnaW46IDAuNXJlbSAwO1xuXG4gICR7dGhlbWUuYnJlYWtwb2ludHMuc219IHtcbiAgICBmb250LXNpemU6IDFyZW07XG4gICAgbWFyZ2luOiAwLjI1cmVtIDA7XG4gIH1cblxuICAke3RoZW1lLmJyZWFrcG9pbnRzLm1kfSB7XG4gICAgbWFyZ2luOiAwLjE1cmVtIDA7XG4gIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBGb290ZXJMaW5rSXRlbVdpdGhBbmNob3I6IFJlYWN0LkZDPFxuICBDb21wb25lbnRQcm9wczx0eXBlb2YgQW5jaG9yPiAmIHtcbiAgICB0cmFja2luZ1RhcmdldDogc3RyaW5nO1xuICAgIGZvb3Rlck9uQ2xpY2s6IEdsb2JhbEZvb3RlckNsaWNrSGFuZGxlcjtcbiAgfVxuPiA9ICh7IHRyYWNraW5nVGFyZ2V0LCBmb290ZXJPbkNsaWNrLCAuLi5hbmNob3JQcm9wcyB9KSA9PiB7XG4gIGNvbnN0IGFuY2hvck9uQ2xpY2sgPSB1c2VDYWxsYmFjayhcbiAgICAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQ8RWxlbWVudCwgTW91c2VFdmVudD4pID0+IHtcbiAgICAgIGZvb3Rlck9uQ2xpY2soeyBldmVudCwgdGFyZ2V0OiB0cmFja2luZ1RhcmdldCB9KTtcbiAgICB9LFxuICAgIFtmb290ZXJPbkNsaWNrLCB0cmFja2luZ1RhcmdldF1cbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxGb290ZXJMaW5rSXRlbT5cbiAgICAgIDxBbmNob3Igey4uLmFuY2hvclByb3BzfSBvbkNsaWNrPXthbmNob3JPbkNsaWNrfSAvPlxuICAgIDwvRm9vdGVyTGlua0l0ZW0+XG4gICk7XG59O1xuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});
FooterLinkItems.defaultProps = {
  as: 'ul',
  pl: 0,
  mb: 0
};
export var FooterLinkItem = /*#__PURE__*/_styled("li", {
  target: "e14jx4vs0",
  label: "FooterLinkItem"
})("font-size:0.875rem;margin:0.5rem 0;", theme.breakpoints.sm, "{font-size:1rem;margin:0.25rem 0;}", theme.breakpoints.md, "{margin:0.15rem 0;}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9HbG9iYWxGb290ZXIvRm9vdGVyTGlua3MudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWtCdUMiLCJmaWxlIjoiLi4vLi4vc3JjL0dsb2JhbEZvb3Rlci9Gb290ZXJMaW5rcy50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBbmNob3IsIEJveCB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0JztcbmltcG9ydCB7IHRoZW1lIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtc3R5bGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IENvbXBvbmVudFByb3BzLCB1c2VDYWxsYmFjayB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgR2xvYmFsRm9vdGVyQ2xpY2tIYW5kbGVyIH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBjb25zdCBGb290ZXJMaW5rSXRlbXMgPSBzdHlsZWQoQm94KWBcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xuYDtcblxuRm9vdGVyTGlua0l0ZW1zLmRlZmF1bHRQcm9wcyA9IHtcbiAgYXM6ICd1bCcsXG4gIHBsOiAwLFxuICBtYjogMCxcbn07XG5cbmV4cG9ydCBjb25zdCBGb290ZXJMaW5rSXRlbSA9IHN0eWxlZC5saWBcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbWFyZ2luOiAwLjVyZW0gMDtcblxuICAke3RoZW1lLmJyZWFrcG9pbnRzLnNtfSB7XG4gICAgZm9udC1zaXplOiAxcmVtO1xuICAgIG1hcmdpbjogMC4yNXJlbSAwO1xuICB9XG5cbiAgJHt0aGVtZS5icmVha3BvaW50cy5tZH0ge1xuICAgIG1hcmdpbjogMC4xNXJlbSAwO1xuICB9XG5gO1xuXG5leHBvcnQgY29uc3QgRm9vdGVyTGlua0l0ZW1XaXRoQW5jaG9yOiBSZWFjdC5GQzxcbiAgQ29tcG9uZW50UHJvcHM8dHlwZW9mIEFuY2hvcj4gJiB7XG4gICAgdHJhY2tpbmdUYXJnZXQ6IHN0cmluZztcbiAgICBmb290ZXJPbkNsaWNrOiBHbG9iYWxGb290ZXJDbGlja0hhbmRsZXI7XG4gIH1cbj4gPSAoeyB0cmFja2luZ1RhcmdldCwgZm9vdGVyT25DbGljaywgLi4uYW5jaG9yUHJvcHMgfSkgPT4ge1xuICBjb25zdCBhbmNob3JPbkNsaWNrID0gdXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PEVsZW1lbnQsIE1vdXNlRXZlbnQ+KSA9PiB7XG4gICAgICBmb290ZXJPbkNsaWNrKHsgZXZlbnQsIHRhcmdldDogdHJhY2tpbmdUYXJnZXQgfSk7XG4gICAgfSxcbiAgICBbZm9vdGVyT25DbGljaywgdHJhY2tpbmdUYXJnZXRdXG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8Rm9vdGVyTGlua0l0ZW0+XG4gICAgICA8QW5jaG9yIHsuLi5hbmNob3JQcm9wc30gb25DbGljaz17YW5jaG9yT25DbGlja30gLz5cbiAgICA8L0Zvb3RlckxpbmtJdGVtPlxuICApO1xufTtcbiJdfQ== */"));
export var FooterLinkItemWithAnchor = function FooterLinkItemWithAnchor(_ref) {
  var trackingTarget = _ref.trackingTarget,
    footerOnClick = _ref.footerOnClick,
    anchorProps = _objectWithoutProperties(_ref, ["trackingTarget", "footerOnClick"]);
  var anchorOnClick = useCallback(function (event) {
    footerOnClick({
      event: event,
      target: trackingTarget
    });
  }, [footerOnClick, trackingTarget]);
  return /*#__PURE__*/_jsx(FooterLinkItem, {
    children: /*#__PURE__*/_jsx(Anchor, _objectSpread(_objectSpread({}, anchorProps), {}, {
      onClick: anchorOnClick
    }))
  });
};