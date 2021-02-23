import { isEmpty } from 'lodash';
import React from 'react';

import { Pattern } from '..';
import { Notification } from '../NotificationList/typings';
import { EmptyNotification } from './EmptyNotification';
import { NotificationItemNew } from './NotificationItemNew';

export type NotificationListNewProps = {
  onDismiss?: (notification: Notification) => void;
  notifications: Notification[];
  onNotificationClick?: (notification: Notification) => void;
};

export const NotificationListNew: React.FC<NotificationListNewProps> = ({
  notifications,
  onNotificationClick,
  onDismiss,
}) => {
  const pattern = <Pattern name="dotsDense" height="1px" display="flex" />;
  return (
    <div>
      {pattern}
      {isEmpty(notifications) ? (
        <EmptyNotification />
      ) : (
        notifications.map((notification: Notification) => {
          return (
            <>
              <NotificationItemNew
                key={notification.id}
                notification={notification}
                handleClick={() => onNotificationClick?.(notification)}
                handleDismiss={() => onDismiss?.(notification)}
              />
              {pattern}
            </>
          );
        })
      )}
    </div>
  );
};
