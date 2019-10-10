/// <reference types="react" />
import { Notification } from './typings';
export declare type NotificationItemProps = {
    onClick?: (event: object) => void;
    notification: Notification;
};
declare const NotificationItem: (props: NotificationItemProps) => JSX.Element;
export default NotificationItem;
