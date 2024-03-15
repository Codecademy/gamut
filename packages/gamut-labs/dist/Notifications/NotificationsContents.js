function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { Box, FlexBox, NotificationList, Text } from '@codecademy/gamut';
import { CheckerDense } from '@codecademy/gamut-patterns';
import { Background } from '@codecademy/gamut-styles';
import React, { useEffect, useRef } from 'react';
import { useNotificationButtons } from './useNotificationButtons';
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
  return /*#__PURE__*/React.createElement(Background, {
    "aria-label": notifications.length ? "My ".concat(notifications.length, " notifications") : "My Notifications",
    bg: "white",
    pb: 24,
    pt: 32,
    role: "dialog"
  }, /*#__PURE__*/React.createElement(FlexBox, {
    alignItems: "center",
    flexDirection: "row",
    height: "40",
    justifyContent: "space-between",
    mb: 16,
    px: 32
  }, /*#__PURE__*/React.createElement(Text, {
    as: "h1",
    fontSize: 22
  }, "My Notifications"), clearAllButton), /*#__PURE__*/React.createElement(Box, {
    px: 32
  }, /*#__PURE__*/React.createElement(CheckerDense, {
    height: "1px",
    display: "flex"
  })), /*#__PURE__*/React.createElement(Box, {
    maxHeight: "520px",
    overflow: "auto"
  }, /*#__PURE__*/React.createElement(Box, {
    pb: 16,
    tabIndex: 0,
    ref: notificationListRef
  }, /*#__PURE__*/React.createElement(NotificationList, {
    notifications: visibleNotifications,
    onDismiss: actions.dismiss,
    onNotificationClick: onNotificationClick
  })), showButton));
};