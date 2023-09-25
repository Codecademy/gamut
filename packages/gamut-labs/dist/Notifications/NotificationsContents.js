function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { Box, FlexBox, NotificationList, Text } from '@codecademy/gamut';
import { CheckerDense } from '@codecademy/gamut-patterns';
import { Background } from '@codecademy/gamut-styles';
import { useEffect, useRef } from 'react';
import * as React from 'react';
import { useNotificationButtons } from './useNotificationButtons';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var NotificationsContents = function NotificationsContents(props) {
  var notificationListRef = useRef(null);
  var actions = props.actions,
    notifications = props.notifications;
  var _useNotificationButto = useNotificationButtons({
      actions: actions,
      notifications: notifications,
      notificationListRef: notificationListRef
    }),
    _useNotificationButto2 = _slicedToArray(_useNotificationButto, 3),
    clearAllButton = _useNotificationButto2[0],
    showButton = _useNotificationButto2[1],
    visibleNotifications = _useNotificationButto2[2];
  var onNotificationClick = function onNotificationClick(notification) {
    actions.click(notification);
    if (notification.unread) {
      actions.read([notification]);
    }
  };
  useEffect(function () {
    var unreadVisibleNotifications = visibleNotifications.filter(function (notification) {
      return notification.unread;
    });
    if (unreadVisibleNotifications.length) {
      actions.read(unreadVisibleNotifications);
    }
  }, [actions, visibleNotifications]);
  return /*#__PURE__*/_jsxs(Background, {
    "aria-label": notifications.length ? "My ".concat(notifications.length, " notifications") : "My Notifications",
    bg: "white",
    pb: 24,
    pt: 32,
    role: "dialog",
    children: [/*#__PURE__*/_jsxs(FlexBox, {
      alignItems: "center",
      flexDirection: "row",
      height: "40",
      justifyContent: "space-between",
      mb: 16,
      px: 32,
      children: [/*#__PURE__*/_jsx(Text, {
        as: "h1",
        fontSize: 22,
        children: "My Notifications"
      }), clearAllButton]
    }), /*#__PURE__*/_jsx(Box, {
      px: 32,
      children: /*#__PURE__*/_jsx(CheckerDense, {
        height: "1px",
        display: "flex"
      })
    }), /*#__PURE__*/_jsxs(Box, {
      maxHeight: "520px",
      overflow: "auto",
      children: [/*#__PURE__*/_jsx(Box, {
        pb: 16,
        tabIndex: 0,
        ref: notificationListRef,
        children: /*#__PURE__*/_jsx(NotificationList, {
          notifications: visibleNotifications,
          onDismiss: actions.dismiss,
          onNotificationClick: onNotificationClick
        })
      }), showButton]
    })]
  });
};