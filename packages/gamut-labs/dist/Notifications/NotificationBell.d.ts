import { ButtonBaseElements, Notification } from '@codecademy/gamut';
import * as React from 'react';
export declare type NotificationBellProps = {
    bellRef: React.RefObject<ButtonBaseElements>;
    notifications: Notification[];
    onClick: () => void;
};
export declare const NotificationBell: React.FC<NotificationBellProps>;
