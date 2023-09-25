import { FlexBox, IconButton, Text } from '@codecademy/gamut';
import { BellIcon } from '@codecademy/gamut-icons';
import { useEffect } from 'react';
import * as React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
export var NotificationBell = function NotificationBell(_ref) {
  var bellRef = _ref.bellRef,
    notifications = _ref.notifications,
    onClick = _ref.onClick;
  var unread = notifications.filter(function (notification) {
    return notification.unread;
  }).length;
  useEffect(function () {
    var favicon = window.document.querySelector('link[rel="shortcut icon"]');
    if (favicon) {
      favicon.href = "/favicon".concat(unread ? '-unread' : '', ".ico");
    }
  }, [unread]);
  return /*#__PURE__*/_jsx(IconButton, {
    "aria-label": unread ? "Toggle Notification Menu, ".concat(unread, " unread notifications") : 'Toggle Notification Menu, no unread notifications',
    icon: BellIcon,
    onClick: onClick,
    ref: bellRef,
    variant: "interface",
    role: "menuitem",
    tabIndex: "-1",
    children: unread ? /*#__PURE__*/_jsx(FlexBox, {
      alignItems: "center",
      bg: "red-500",
      borderRadius: "3px",
      height: 18,
      justifyContent: "center",
      left: 22,
      position: "absolute",
      textAlign: "center",
      top: -2,
      width: 20,
      children: /*#__PURE__*/_jsx(Text, {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
        mt: 4,
        children: Math.min(unread, 99)
      })
    }) : null
  });
};