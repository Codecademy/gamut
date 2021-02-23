import { isEmpty } from 'lodash';
import React from 'react';

import { Box, Pattern } from '..';
import { Notification } from '../NotificationList/typings';
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
  const pattern = (
    <Box paddingX={32}>
      <Pattern name="dotsDense" height="1px" display="flex" />
    </Box>
  );
  return (
    <div>
      {pattern}
      {isEmpty(notifications) ? (
        <div>Empty Notifications Placeholder</div>
      ) : (
        notifications.map((notification: Notification) => {
          return (
            <Box key={notification.id}>
              <NotificationItemNew
                notification={notification}
                handleClick={() => onNotificationClick?.(notification)}
                handleDismiss={() => onDismiss?.(notification)}
              />
              {pattern}
            </Box>
          );
        })
      )}
    </div>
  );
};
