function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { Box } from '@codecademy/gamut';
import { useTheme } from '@emotion/react';
import React, { useCallback, useState } from 'react';
import { AppHeader, AppHeaderMobile } from '..';
import { isAppHeaderItemWithHref } from '../AppHeader/AppHeaderElements/types';
import { anonDefaultHeaderItems, anonDefaultMobileHeaderItems, anonLandingHeaderItems, anonLandingMobileHeaderItems, anonLoginHeaderItems, anonLoginMobileHeaderItems, anonSignupHeaderItems, anonSignupMobileHeaderItems, freeHeaderItems, freeMobileHeaderItems, loadingHeaderItems, loadingMobileHeaderItems, proHeaderItems, proMobileHeaderItems } from './GlobalHeaderVariants';
import { CrossDeviceItemId } from './types';

var getAppHeaderItems = function getAppHeaderItems(props) {
  var _props$renderFavorite, _props$renderFavorite2;

  switch (props.type) {
    case 'anon':
      switch (props.variant) {
        case 'landing':
          return anonLandingHeaderItems(props.hidePricing, props.user, props.renderBookmarks);

        case 'login':
          return anonLoginHeaderItems(props.hidePricing, props.user, props.renderBookmarks);

        case 'signup':
          return anonSignupHeaderItems(props.hidePricing, props.user, props.renderBookmarks);

        default:
          return anonDefaultHeaderItems(props.hidePricing, props.user, props.renderBookmarks);
      }

    case 'free':
      return freeHeaderItems(props.user, props.hidePricing, (_props$renderFavorite = props.renderFavorites) === null || _props$renderFavorite === void 0 ? void 0 : _props$renderFavorite.desktop, props.renderBookmarks);

    case 'pro':
      return proHeaderItems(props.user, (_props$renderFavorite2 = props.renderFavorites) === null || _props$renderFavorite2 === void 0 ? void 0 : _props$renderFavorite2.desktop, props.renderBookmarks);

    case 'loading':
      return loadingHeaderItems;
  }
};

var getMobileAppHeaderItems = function getMobileAppHeaderItems(props) {
  switch (props.type) {
    case 'anon':
      switch (props.variant) {
        case 'landing':
          return anonLandingMobileHeaderItems(props.hidePricing, props.user, props.renderBookmarks);

        case 'login':
          return anonLoginMobileHeaderItems(props.hidePricing, props.user, props.renderBookmarks);

        case 'signup':
          return anonSignupMobileHeaderItems(props.hidePricing, props.user, props.renderBookmarks);

        default:
          return anonDefaultMobileHeaderItems(props.hidePricing, props.user, props.renderBookmarks);
      }

    case 'free':
      return freeMobileHeaderItems(props.user, props.hidePricing, props.renderBookmarks);

    case 'pro':
      return proMobileHeaderItems(props.user, props.renderBookmarks);

    case 'loading':
      return loadingMobileHeaderItems;
  }
};

export var GlobalHeader = function GlobalHeader(props) {
  var action = props.action,
      onLinkAction = props.onLinkAction;
  var theme = useTheme();
  var combinedAction = useCallback(function (event, item) {
    action(event, item);
    if (isAppHeaderItemWithHref(item)) onLinkAction === null || onLinkAction === void 0 ? void 0 : onLinkAction(event, item);
  }, [action, onLinkAction]); // manages global toggle state for items (only 1 open at a time)

  var _useState = useState(CrossDeviceItemId.UNSET),
      _useState2 = _slicedToArray(_useState, 2),
      openCrossDeviceItemId = _useState2[0],
      setOpenCrossDeviceItemId = _useState2[1];

  var crossDeviceBookmarkParts = props.crossDeviceBookmarkParts;
  return /*#__PURE__*/React.createElement(Box, {
    as: "header",
    position: "sticky",
    top: 0,
    zIndex: theme.elements.headerZ
  }, /*#__PURE__*/React.createElement(AppHeader, _extends({
    action: combinedAction,
    items: getAppHeaderItems(props),
    search: props.search
  }, props.type === 'anon' ? {
    redirectParam: props.redirectParam
  } : props.type === 'loading' ? {} : {
    notifications: props.notifications
  }, {
    isAnon: props.type === 'anon',
    openCrossDeviceItemId: openCrossDeviceItemId,
    setOpenCrossDeviceItemId: setOpenCrossDeviceItemId,
    crossDeviceBookmarkParts: crossDeviceBookmarkParts
  })), /*#__PURE__*/React.createElement(AppHeaderMobile, _extends({
    action: combinedAction,
    items: getMobileAppHeaderItems(props)
  }, props.type === 'anon' || props.type === 'loading' ? {} : {
    notifications: props.notifications
  }, {
    onSearch: props.search.onSearch,
    redirectParam: props.type === 'anon' ? props.redirectParam : undefined,
    isAnon: props.type === 'anon',
    openCrossDeviceItemId: openCrossDeviceItemId,
    setOpenCrossDeviceItemId: setOpenCrossDeviceItemId,
    crossDeviceBookmarkParts: crossDeviceBookmarkParts
  })), props.children);
};