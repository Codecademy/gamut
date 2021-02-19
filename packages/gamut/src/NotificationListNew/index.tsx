import { isEmpty } from 'lodash';
import React from 'react';

import { Pattern } from '..';
import { Notification } from '../NotificationList/typings';
import { NotificationItemNew } from './NotificationItemNew';

export type NotificationListNewProps = {
  handleDismiss?: (notification: Notification) => void;
  notifications: Notification[];
  onNotificationClick?: (notification: Notification) => void;
};

export const NotificationListNew = (props: NotificationListNewProps) => {
  const { notifications, onNotificationClick, handleDismiss } = props;
  const pattern = <Pattern name="dotsDense" height="1px" display="flex" />;
  return (
    <div>
      {pattern}
      {isEmpty(notifications) ? (
        <div>Empty Notifications Placeholder </div>
      ) : (
        notifications.map((notification: Notification) => {
          return (
            <>
              <NotificationItemNew
                key={notification.id}
                notification={notification}
                handleClick={() => onNotificationClick?.(notification)}
                handleDismiss={() => handleDismiss?.(notification)}
              />
              {pattern}
            </>
          );
        })
      )}
    </div>
  );
};
