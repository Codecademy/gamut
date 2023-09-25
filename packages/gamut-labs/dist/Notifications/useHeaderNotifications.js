import { useRef } from 'react';
import * as React from 'react';
import { AnimatedHeaderZone } from '../AppHeader/shared';
import { CrossDeviceItemId } from '../GlobalHeader/types';
import { NotificationBell } from './NotificationBell';
import { jsx as _jsx } from "react/jsx-runtime";
export var useHeaderNotifications = function useHeaderNotifications(_ref) {
  var settings = _ref.settings,
    Renderer = _ref.Renderer,
    openCrossDeviceItemId = _ref.openCrossDeviceItemId,
    setOpenCrossDeviceItemId = _ref.setOpenCrossDeviceItemId;
  var bellRef = useRef(null);
  if (!settings) {
    return [null, null];
  }
  var id = CrossDeviceItemId.NOTIFICATIONS;
  var togglePane = function togglePane() {
    if (openCrossDeviceItemId !== id) {
      settings.onEnable();
    }
    setOpenCrossDeviceItemId(openCrossDeviceItemId === id ? CrossDeviceItemId.UNSET : id);
  };
  return [{
    id: id,
    type: 'render-element',
    renderElement: function renderElement() {
      return /*#__PURE__*/_jsx(NotificationBell, {
        bellRef: bellRef,
        notifications: settings.notifications,
        onClick: togglePane
      });
    }
  }, /*#__PURE__*/_jsx(AnimatedHeaderZone, {
    visible: openCrossDeviceItemId === id,
    children: /*#__PURE__*/_jsx(Renderer, {
      actions: settings.actions,
      bellRef: bellRef,
      notifications: settings.notifications,
      setOpenCrossDeviceItemId: setOpenCrossDeviceItemId
    })
  }, "notifications-content")];
};