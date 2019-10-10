/// <reference types="react" />
import { Notification } from './typings';
declare type NotificationListProps = {
    className?: string;
    notifications?: Notification[];
    onNotificationClick?: ({ _: string, _: string }: {
        _: any;
    }) => void;
};
declare const NotificationList: (props: NotificationListProps) => JSX.Element;
export default NotificationList;
