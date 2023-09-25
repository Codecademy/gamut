function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { Box, TextButton } from '@codecademy/gamut';
import { useState } from 'react';
import { defaultDisplayLimit } from './constants';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
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
  var clearAllButton = notifications.length > 0 && (notifications.length <= displayLimit || showMore) ? /*#__PURE__*/_jsx(TextButton, {
    onClick: function onClick() {
      var _notificationListRef$;
      actions.clear();
      actions.track('notification_clear_all');
      notificationListRef === null || notificationListRef === void 0 ? void 0 : (_notificationListRef$ = notificationListRef.current) === null || _notificationListRef$ === void 0 ? void 0 : _notificationListRef$.focus();
    },
    "aria-label": "Clear all ".concat(notifications.length, " notifications"),
    children: "Clear All"
  }) : null;
  var showMoreButton = notifications.length <= defaultDisplayLimit ? null : /*#__PURE__*/_jsx(Box, {
    px: 32,
    children: /*#__PURE__*/_jsxs(TextButton, {
      onClick: function onClick() {
        setShowMore(!showMore);
        if (!showMore) {
          actions.track('notification_show_more');
          actions.read(notifications.slice(defaultDisplayLimit));
        }
      },
      children: ["Show ", amountAdjective]
    })
  });
  return [clearAllButton, showMoreButton, notifications.slice(0, displayLimit)];
};