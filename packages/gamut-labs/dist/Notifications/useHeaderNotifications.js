import React, { useRef } from 'react';
import { AnimatedHeaderZone } from '../AppHeader/shared';
import { CrossDeviceItemId } from '../GlobalHeader/types';
import { NotificationBell } from './NotificationBell';
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
      return /*#__PURE__*/React.createElement(NotificationBell, {
        bellRef: bellRef,
        notifications: settings.notifications,
        onClick: togglePane
      });
    }
  }, /*#__PURE__*/React.createElement(AnimatedHeaderZone, {
    visible: openCrossDeviceItemId === id,
    key: "notifications-content"
  }, /*#__PURE__*/React.createElement(Renderer, {
    actions: settings.actions,
    bellRef: bellRef,
    notifications: settings.notifications
  }))];
};