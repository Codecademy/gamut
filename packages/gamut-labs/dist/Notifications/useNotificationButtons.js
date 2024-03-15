function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { Box, TextButton } from '@codecademy/gamut';
import React, { useState } from 'react';
import { defaultDisplayLimit } from './constants';
export var useNotificationButtons = function useNotificationButtons(_ref) {
  var actions = _ref.actions,
      notifications = _ref.notifications,
      notificationListRef = _ref.notificationListRef;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      showMore = _useState2[0],
      setShowMore = _useState2[1];

  var _ref2 = showMore ? [notifications.length, 'Less'] : [defaultDisplayLimit, 'More'],
      _ref3 = _slicedToArray(_ref2, 2),
      displayLimit = _ref3[0],
      amountAdjective = _ref3[1];

  if (notifications.length === 0) {
    return [null, null, notifications];
  }

  var clearAllButton = notifications.length > 0 && (notifications.length <= displayLimit || showMore) ? /*#__PURE__*/React.createElement(TextButton, {
    onClick: function onClick() {
      var _notificationListRef$;

      actions.clear();
      actions.track('notification_clear_all');
      notificationListRef === null || notificationListRef === void 0 ? void 0 : (_notificationListRef$ = notificationListRef.current) === null || _notificationListRef$ === void 0 ? void 0 : _notificationListRef$.focus();
    },
    "aria-label": "Clear all ".concat(notifications.length, " notifications")
  }, "Clear All") : null;
  var showMoreButton = notifications.length <= defaultDisplayLimit ? null : /*#__PURE__*/React.createElement(Box, {
    px: 32
  }, /*#__PURE__*/React.createElement(TextButton, {
    onClick: function onClick() {
      setShowMore(!showMore);

      if (!showMore) {
        actions.track('notification_show_more');
        actions.read(notifications.slice(defaultDisplayLimit));
      }
    }
  }, "Show ", amountAdjective));
  return [clearAllButton, showMoreButton, notifications.slice(0, displayLimit)];
};