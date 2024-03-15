function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { Anchor } from '@codecademy/gamut';
import React from 'react';
import { appHeaderMobileBreakpoint } from '../../shared';
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
  return /*#__PURE__*/React.createElement(Anchor, _extends({
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
  }, props), showIcon && Icon && /*#__PURE__*/React.createElement(Icon, {
    mr: 16,
    size: 24,
    "aria-hidden": true
  }), item.text, item.badge);
};