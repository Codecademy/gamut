import { Notification } from '@codecademy/gamut';
import { Dispatch } from 'react';

export type AppHeaderNotifications = {
  baseUrl: string;
  initial: Notification[];
  onEnable: () => void;
  onTrackingClick: OnNotificationClick;
};

export type NotificationActions = {
  get: (id: string) => Notification | undefined;
  markRead: (readNotifications: Notification[]) => void;
  setAll: (newNotifications: Map<string, Notification>) => void;
};

export type OnNotificationClick = (
  target: string,
  notification?: Notification
) => void;

export type NotificationsPaneContentsProps = {
  baseUrl: string;
  notifications: Notification[];
  onTrackingClick: OnNotificationClick;
  setNotifications: Dispatch<Notification[]>;
};
