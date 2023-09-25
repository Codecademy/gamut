function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
import { Box } from '@codecademy/gamut';
import { useTheme } from '@emotion/react';
import { useCallback, useState } from 'react';
import * as React from 'react';
import { AppHeader, AppHeaderMobile } from '..';
import { isAppHeaderItemWithHref } from '../AppHeader/AppHeaderElements/types';
import { anonDefaultHeaderItems, anonDefaultMobileHeaderItems, anonLandingHeaderItems, anonLandingMobileHeaderItems, anonLoginHeaderItems, anonLoginMobileHeaderItems, anonSignupHeaderItems, anonSignupMobileHeaderItems, freeHeaderItems, freeMobileHeaderItems, loadingHeaderItems, loadingMobileHeaderItems, proHeaderItems, proMobileHeaderItems } from './GlobalHeaderVariants';
import { CrossDeviceItemId } from './types';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function getAppHeaderItems(props, mobile) {
  var hidePricing = props.hidePricing;
  switch (props.type) {
    case 'anon':
      switch (props.variant) {
        case 'landing':
          return mobile ? anonLandingMobileHeaderItems(hidePricing, props.user) : anonLandingHeaderItems(hidePricing, props.user);
        case 'login':
          return mobile ? anonLoginMobileHeaderItems(hidePricing, props.user) : anonLoginHeaderItems(hidePricing, props.user);
        case 'signup':
          return mobile ? anonSignupMobileHeaderItems(hidePricing, props.user) : anonSignupHeaderItems(hidePricing, props.user);
        default:
          return mobile ? anonDefaultMobileHeaderItems(hidePricing, props.user) : anonDefaultHeaderItems(hidePricing, props.user);
      }
    case 'free':
      return mobile ? freeMobileHeaderItems(props.user, hidePricing) : freeHeaderItems(props.user, hidePricing);
    case 'pro':
      return mobile ? proMobileHeaderItems(props.user) : proHeaderItems(props.user);
    case 'loading':
      return mobile ? loadingMobileHeaderItems : loadingHeaderItems;
  }
}
export var GlobalHeader = function GlobalHeader(props) {
  var action = props.action,
    onLinkAction = props.onLinkAction;
  var theme = useTheme();
  var combinedAction = useCallback(function (event, item) {
    action(event, item);
    if (isAppHeaderItemWithHref(item)) onLinkAction === null || onLinkAction === void 0 ? void 0 : onLinkAction(event, item);
  }, [action, onLinkAction]);

  // manages global toggle state for items (only 1 open at a time)
  var _useState = useState(CrossDeviceItemId.UNSET),
    _useState2 = _slicedToArray(_useState, 2),
    openCrossDeviceItemId = _useState2[0],
    setOpenCrossDeviceItemId = _useState2[1];
  return /*#__PURE__*/_jsxs(Box, {
    as: "header",
    position: "sticky",
    top: 0,
    zIndex: theme.elements.headerZ,
    children: [/*#__PURE__*/_jsx(AppHeader, _objectSpread(_objectSpread({
      action: combinedAction,
      items: getAppHeaderItems(props, false),
      search: props.search
    }, props.type === 'anon' ? {
      redirectParam: props.redirectParam
    } : props.type === 'loading' ? {} : {
      notifications: props.notifications
    }), {}, {
      isAnon: props.type === 'anon',
      openCrossDeviceItemId: openCrossDeviceItemId,
      setOpenCrossDeviceItemId: setOpenCrossDeviceItemId
    })), /*#__PURE__*/_jsx(AppHeaderMobile, _objectSpread(_objectSpread({
      action: combinedAction,
      items: getAppHeaderItems(props, true)
    }, props.type === 'anon' || props.type === 'loading' ? {} : {
      notifications: props.notifications
    }), {}, {
      onSearch: props.search.onSearch,
      redirectParam: props.type === 'anon' ? props.redirectParam : undefined,
      isAnon: props.type === 'anon',
      openCrossDeviceItemId: openCrossDeviceItemId,
      setOpenCrossDeviceItemId: setOpenCrossDeviceItemId
    })), props.children]
  });
};