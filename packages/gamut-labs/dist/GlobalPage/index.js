function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import { AppWrapper, SkipToContent, SkipToContentTarget } from '@codecademy/gamut';
import { Background } from '@codecademy/gamut-styles';
import { forwardRef } from 'react';
import * as React from 'react';
import { Banner } from '../Banner';
import { GlobalFooter } from '../GlobalFooter';
import { GlobalHeader } from '../GlobalHeader';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var defaultSkipToContentId = 'page-skip-to-content-target';
var RestrictedBackground = /*#__PURE__*/forwardRef(function RestrictedBackground(_ref, ref) {
  var children = _ref.children,
    rest = _objectWithoutProperties(_ref, ["children"]);
  return /*#__PURE__*/_jsx(Background, _objectSpread(_objectSpread({
    "data-testid": "global-page-wrapper"
  }, rest), {}, {
    ref: ref,
    children: children
  }));
});
var GlobalPageWrapper = AppWrapper.withComponent(RestrictedBackground, {
  target: "e151iuzl0",
  label: "GlobalPageWrapper"
});
export var GlobalPage = function GlobalPage(_ref2) {
  var _ref2$backgroundColor = _ref2.backgroundColor,
    backgroundColor = _ref2$backgroundColor === void 0 ? 'background' : _ref2$backgroundColor,
    banner = _ref2.banner,
    children = _ref2.children,
    _ref2$contentAs = _ref2.contentAs,
    contentAs = _ref2$contentAs === void 0 ? 'div' : _ref2$contentAs,
    footer = _ref2.footer,
    header = _ref2.header,
    skipToContentId = _ref2.skipToContentId;
  return /*#__PURE__*/_jsxs(GlobalPageWrapper, {
    bg: backgroundColor,
    minHeight: "100vh",
    children: [/*#__PURE__*/_jsx(SkipToContent, {
      contentId: skipToContentId || defaultSkipToContentId
    }), banner && /*#__PURE__*/_jsx(Banner, _objectSpread({}, banner)), /*#__PURE__*/_jsx(GlobalHeader, _objectSpread({}, header)), !skipToContentId && /*#__PURE__*/_jsx(SkipToContentTarget, {
      id: defaultSkipToContentId
    }), /*#__PURE__*/_jsx(AppWrapper, {
      as: contentAs,
      children: children
    }), /*#__PURE__*/_jsx(GlobalFooter, _objectSpread({}, footer))]
  });
};