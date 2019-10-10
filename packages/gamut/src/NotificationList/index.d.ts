/// <reference types="react" />
import { Notification } from './typings';
declare type NotificationListProps = {
    className?: string;
    notifications?: Notification[];
    onNotificationClick?: (args: {
        eventId: string;
        context: string;
    }) => void;
};
declare const NotificationList: (props: NotificationListProps) => JSX.Element;
export default NotificationList;
