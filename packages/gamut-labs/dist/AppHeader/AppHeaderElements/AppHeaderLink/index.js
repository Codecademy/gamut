function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import { Anchor } from '@codecademy/gamut';
import * as React from 'react';
import { appHeaderMobileBreakpoint } from '../../shared';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var AppHeaderLink = function AppHeaderLink(_ref) {
  var action = _ref.action,
    item = _ref.item,
    _ref$showIcon = _ref.showIcon,
    showIcon = _ref$showIcon === void 0 ? false : _ref$showIcon,
    _ref$mx = _ref.mx,
    mx = _ref$mx === void 0 ? _defineProperty({
      _: 0
    }, appHeaderMobileBreakpoint, 24) : _ref$mx,
    _ref$py = _ref.py,
    py = _ref$py === void 0 ? _defineProperty({
      _: 16
    }, appHeaderMobileBreakpoint, 8) : _ref$py,
    onKeyDown = _ref.onKeyDown,
    props = _objectWithoutProperties(_ref, ["action", "item", "showIcon", "mx", "py", "onKeyDown"]);
  var Icon = item.icon;
  return /*#__PURE__*/_jsxs(Anchor, _objectSpread(_objectSpread({
    "data-testid": item.dataTestId,
    href: item.href,
    onClick: function onClick(event) {
      return action(event, item);
    },
    onKeyDown: onKeyDown,
    role: "menuitem",
    target: item.newTab ? 'blank' : '',
    variant: "interface",
    alignContent: "center",
    alignItems: "center",
    display: "flex",
    fontWeight: "normal",
    lineHeight: "base",
    minWidth: "0",
    textAlign: "left",
    whiteSpace: "nowrap",
    mx: mx,
    py: py
  }, props), {}, {
    children: [showIcon && Icon && /*#__PURE__*/_jsx(Icon, {
      mr: 16,
      size: 24,
      "aria-hidden": true
    }), item.text, item.badge]
  }));
};