function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { FlexBox, Popover } from '@codecademy/gamut';
import React from 'react';
import { NotificationsContents } from './NotificationsContents';
export var NotificationsPopover = function NotificationsPopover(_ref) {
  var bellRef = _ref.bellRef,
      props = _objectWithoutProperties(_ref, ["bellRef"]);

  return /*#__PURE__*/React.createElement(Popover, {
    align: "right",
    verticalOffset: 1,
    outline: true,
    isOpen: true,
    targetRef: bellRef
  }, /*#__PURE__*/React.createElement(FlexBox, {
    bg: "white",
    textAlign: "left",
    width: 360
  }, /*#__PURE__*/React.createElement(NotificationsContents, props)));
};