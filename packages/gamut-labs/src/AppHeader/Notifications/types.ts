import { Notification } from '@codecademy/gamut';

export type NotificationActions = {
  clear: () => void;
  click: (notification: Notification) => void;
  dismiss: (notification: Notification) => void;
  read: (notification: Notification) => void;
  track: (target: string) => void;
};

export type AppHeaderNotifications = {
  actions: NotificationActions;
  notifications: Notification[];
  onEnable: () => void;
};

export type NotificationsPaneContentsProps = {
  actions: NotificationActions;
  notifications: Notification[];
};
