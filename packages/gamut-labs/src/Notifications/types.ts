import { ButtonBaseElements, Notification } from '@codecademy/gamut';
import React from 'react';

import { CrossDeviceItemId } from '../GlobalHeader/types';

export type NotificationActions = {
  clear: () => void;
  click: (notification: Notification) => void;
  dismiss: (notification: Notification) => void;
  read: (notifications: Notification[]) => void;
  track: (target: string) => void;
};

export type AppHeaderNotificationSettings = {
  actions: NotificationActions;
  notifications: Notification[];
  onEnable: () => void;
};

export type NotificationsContentsProps = {
  actions: NotificationActions;
  notifications: Notification[];
  notificationListRef?: React.RefObject<HTMLDivElement>;
  openCrossDeviceItemId?: CrossDeviceItemId;
  setOpenCrossDeviceItemId?: React.Dispatch<React.SetStateAction<string>>;
};

export type NotificationsRendererProps = NotificationsContentsProps & {
  bellRef: React.RefObject<ButtonBaseElements>;
};
