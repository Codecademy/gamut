/// <reference types="react" />
import { ButtonBaseElements, Notification } from '@codecademy/gamut';
export declare type NotificationActions = {
    clear: () => void;
    click: (notification: Notification) => void;
    dismiss: (notification: Notification) => void;
    read: (notifications: Notification[]) => void;
    track: (target: string) => void;
};
export declare type AppHeaderNotificationSettings = {
    actions: NotificationActions;
    notifications: Notification[];
    onEnable: () => void;
};
export declare type NotificationsContentsProps = {
    actions: NotificationActions;
    notifications: Notification[];
    notificationListRef?: React.RefObject<HTMLDivElement>;
};
export declare type NotificationsRendererProps = NotificationsContentsProps & {
    bellRef: React.RefObject<ButtonBaseElements>;
};
