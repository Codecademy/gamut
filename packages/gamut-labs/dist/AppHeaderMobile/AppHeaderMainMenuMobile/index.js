function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { Box, ContentContainer, FillButton, FlexBox, TextButton } from '@codecademy/gamut';
import React, { useState } from 'react';
import { AppHeaderLink } from '../../AppHeader/AppHeaderElements/AppHeaderLink';
import { AppHeaderListItem } from '../../AppHeader/AppHeaderElements/AppHeaderListItem';
import { login, signUp } from '../../GlobalHeader/GlobalHeaderItems';
import { AppHeaderSubMenuMobile } from '../AppHeaderSubMenuMobile';
import { AppHeaderSubMenuTarget } from '../AppHeaderSubMenuTarget';
import { MobileSearchBar } from './MobileSearchBar';
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
        return /*#__PURE__*/React.createElement(AppHeaderLink, {
          key: item.id,
          item: item,
          action: action,
          showIcon: true
        });

      case 'dropdown':
      case 'profile-dropdown':
      case 'catalog-dropdown':
      case 'experimental-resources-dropdown':
        return /*#__PURE__*/React.createElement(AppHeaderSubMenuTarget, {
          key: item.id,
          item: item,
          openSubMenu: openSubMenu
        });

      case 'fill-button':
        return /*#__PURE__*/React.createElement(FillButton, {
          "data-testid": item.dataTestId,
          href: item.href,
          onClick: function onClick(event) {
            return action(event, item);
          },
          mt: 32,
          mx: "auto",
          key: item.id,
          role: "menuitem"
        }, item.text);

      case 'text-button':
        return /*#__PURE__*/React.createElement(TextButton, {
          mt: 16,
          mx: "auto",
          key: item.id,
          "data-testid": item.dataTestId,
          href: item.href,
          onClick: function onClick(event) {
            return action(event, item);
          },
          role: "menuitem"
        }, item.text);
    }
  };

  return subMenuItem ? /*#__PURE__*/React.createElement(AppHeaderSubMenuMobile, {
    handleCloseSubMenu: closeSubMenu,
    action: action,
    item: subMenuItem,
    handleCloseMainMenu: handleCloseMainMenu
  }) : /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(ContentContainer, null, /*#__PURE__*/React.createElement(AppHeaderListItem, null, /*#__PURE__*/React.createElement(MobileSearchBar, {
    onSearch: onSearch
  })), items.map(function (item) {
    return /*#__PURE__*/React.createElement(AppHeaderListItem, {
      key: item.id
    }, mapItemToElement(item, action));
  })), isAnon && /*#__PURE__*/React.createElement(FlexBox, {
    as: "li",
    alignItems: "baseline",
    justifyContent: "center",
    pt: 16,
    borderTop: 1,
    borderColor: "navy-300"
  }, /*#__PURE__*/React.createElement(FillButton, {
    "data-testid": signUp.dataTestId,
    href: signUp.href,
    onClick: function onClick(event) {
      return action(event, signUp);
    },
    key: signUp.id,
    role: "menuitem"
  }, signUp.text), /*#__PURE__*/React.createElement(TextButton, {
    key: login.id,
    "data-testid": login.dataTestId,
    href: login.href,
    onClick: function onClick(event) {
      return action(event, login);
    },
    role: "menuitem"
  }, login.text)));
};