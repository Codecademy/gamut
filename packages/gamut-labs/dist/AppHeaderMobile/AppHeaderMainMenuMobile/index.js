function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { Box, ContentContainer, FillButton, FlexBox, TextButton } from '@codecademy/gamut';
import { useState } from 'react';
import * as React from 'react';
import { AppHeaderLink } from '../../AppHeader/AppHeaderElements/AppHeaderLink';
import { AppHeaderListItem } from '../../AppHeader/AppHeaderElements/AppHeaderListItem';
import { login, signUp } from '../../GlobalHeader/GlobalHeaderItems';
import { AppHeaderSubMenuMobile } from '../AppHeaderSubMenuMobile';
import { AppHeaderSubMenuTarget } from '../AppHeaderSubMenuTarget';
import { MobileSearchBar } from './MobileSearchBar';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var AppHeaderMainMenuMobile = function AppHeaderMainMenuMobile(_ref) {
  var action = _ref.action,
    items = _ref.items,
    onSearch = _ref.onSearch,
    getItemType = _ref.getItemType,
    isAnon = _ref.isAnon,
    handleCloseMainMenu = _ref.handleCloseMainMenu;
  var _useState = useState(),
    _useState2 = _slicedToArray(_useState, 2),
    subMenuItem = _useState2[0],
    setSubMenuItem = _useState2[1];
  var openSubMenu = function openSubMenu(event, item) {
    action(event, item);
    setSubMenuItem(item);
    getItemType(item.type);
  };
  var closeSubMenu = function closeSubMenu() {
    setSubMenuItem(undefined);
    getItemType(undefined);
  };
  var mapItemToElement = function mapItemToElement(item, action) {
    switch (item.type) {
      case 'link':
        return /*#__PURE__*/_jsx(AppHeaderLink, {
          item: item,
          action: action,
          showIcon: true
        }, item.id);
      case 'dropdown':
      case 'profile-dropdown':
      case 'catalog-dropdown':
      case 'resources-dropdown':
        return /*#__PURE__*/_jsx(AppHeaderSubMenuTarget, {
          item: item,
          openSubMenu: openSubMenu
        }, item.id);
      case 'fill-button':
        return /*#__PURE__*/_jsx(FillButton, {
          "data-testid": item.dataTestId,
          href: item.href,
          onClick: function onClick(event) {
            return action(event, item);
          },
          mt: 32,
          mx: "auto",
          role: "menuitem",
          children: item.text
        }, item.id);
      case 'text-button':
        return /*#__PURE__*/_jsx(TextButton, {
          mt: 16,
          mx: "auto",
          "data-testid": item.dataTestId,
          href: item.href,
          onClick: function onClick(event) {
            return action(event, item);
          },
          role: "menuitem",
          children: item.text
        }, item.id);
    }
  };
  return subMenuItem ? /*#__PURE__*/_jsx(AppHeaderSubMenuMobile, {
    handleCloseSubMenu: closeSubMenu,
    action: action,
    item: subMenuItem,
    handleCloseMainMenu: handleCloseMainMenu
  }) : /*#__PURE__*/_jsxs(Box, {
    children: [/*#__PURE__*/_jsxs(ContentContainer, {
      children: [/*#__PURE__*/_jsx(AppHeaderListItem, {
        children: /*#__PURE__*/_jsx(MobileSearchBar, {
          onSearch: onSearch
        })
      }), items.map(function (item) {
        return /*#__PURE__*/_jsx(AppHeaderListItem, {
          children: mapItemToElement(item, action)
        }, item.id);
      })]
    }), isAnon && /*#__PURE__*/_jsxs(FlexBox, {
      as: "li",
      alignItems: "baseline",
      justifyContent: "center",
      pt: 16,
      borderTop: 1,
      borderColor: "navy-300",
      children: [/*#__PURE__*/_jsx(FillButton, {
        "data-testid": signUp.dataTestId,
        href: signUp.href,
        onClick: function onClick(event) {
          return action(event, signUp);
        },
        role: "menuitem",
        children: signUp.text
      }, signUp.id), /*#__PURE__*/_jsx(TextButton, {
        "data-testid": login.dataTestId,
        href: login.href,
        onClick: function onClick(event) {
          return action(event, login);
        },
        role: "menuitem",
        children: login.text
      }, login.id)]
    })]
  });
};