import styled from '@emotion/styled';
import { isEmpty } from 'lodash';
import React from 'react';

import { Notification } from '../NotificationList/typings';
import { EmptyNotification } from './EmptyNotification';
import { NotificationItemNew } from './NotificationItemNew';

export type NotificationListNewProps = {
  onDismiss?: (notification: Notification) => void;
  notifications: Notification[];
  onNotificationClick?: (notification: Notification) => void;
  headerElementId?: string; // Used for aria-labelledby for the list.
};

const UnstyledUnorderedList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const NotificationListNew: React.FC<NotificationListNewProps> = ({
  notifications,
  onNotificationClick,
  onDismiss,
  headerElementId,
}) => {
  return isEmpty(notifications) ? (
    <EmptyNotification />
  ) : (
    <UnstyledUnorderedList aria-labelledby={headerElementId} aria-live="polite">
      {notifications.map((notification: Notification) => (
        <NotificationItemNew
          key={notification.id}
          notification={notification}
          handleClick={() => onNotificationClick?.(notification)}
          handleDismiss={() => onDismiss?.(notification)}
        />
      ))}
    </UnstyledUnorderedList>
  );
};
