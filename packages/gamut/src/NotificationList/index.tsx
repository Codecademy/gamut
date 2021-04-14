import styled from '@emotion/styled';
import { isEmpty } from 'lodash';
import React from 'react';

import { EmptyNotification } from './EmptyNotification';
import { NotificationItem } from './NotificationItem';
import { Notification } from './typings';

export type NotificationListProps = {
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

export const NotificationList: React.FC<NotificationListProps> = ({
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
        <NotificationItem
          key={notification.id}
          notification={notification}
          handleClick={() => onNotificationClick?.(notification)}
          handleDismiss={() => onDismiss?.(notification)}
        />
      ))}
    </UnstyledUnorderedList>
  );
};
