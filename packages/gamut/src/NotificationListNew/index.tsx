import { isEmpty } from 'lodash';
import React from 'react';

import { Pattern } from '..';
import { Notification } from '../NotificationList/typings';
import { EmptyNotification } from './EmptyNotification';
import { NotificationItemNew } from './NotificationItemNew';

export type NotificationListNewProps = {
  className?: string;
  notifications: Notification[];
  onNotificationClick?: (notification: Notification) => void;
};

export const NotificationListNew = (props: NotificationListNewProps) => {
  const { notifications, onNotificationClick } = props;

  return (
    <div>
      <Pattern name="dotsDense" height="1px" position="relative" />
      {isEmpty(notifications) ? (
        <EmptyNotification />
      ) : (
        <>
          {notifications.map((notification: Notification) => {
            return (
              <>
                <NotificationItemNew
                  key={notification.id}
                  notification={notification}
                  onClick={() => onNotificationClick?.(notification)}
                />
                <Pattern name="dotsDense" height="1px" position="relative" />
              </>
            );
          })}
        </>
      )}
    </div>
  );
};
