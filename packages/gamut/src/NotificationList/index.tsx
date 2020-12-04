import { colors, mediaQueries, spacing } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { isEmpty } from 'lodash';
import React from 'react';
import { Heading } from '../Typography';

import { NotificationItem } from './NotificationItem';
import { Notification } from './typings';

export type NotificationListProps = {
  className?: string;
  notifications: Notification[];
  onNotificationClick?: (notification: Notification) => void;
};

const NotificationsContainer = styled.div`
  background-color: ${colors.white};
  /* color: ${colors['gray-800']}; */
  font-size: 1rem;
  padding: ${spacing[32]} ${spacing[32]} ${spacing[4]};

  ${mediaQueries.md} {
    text-align: left;
  }
`;

const EmptyText = styled.div`
  background: none;
  border: none;
  margin: 3rem;
  text-align: center;
`;

export const NotificationList: React.FC<NotificationListProps> = ({
  className,
  notifications,
  onNotificationClick,
}) => {
  return (
    <NotificationsContainer className={className}>
      {isEmpty(notifications) ? (
        <EmptyText>
          No new notifications.
          <br />
          You&apos;re all caught up!
        </EmptyText>
      ) : (
        <>
          <Heading as="h2" fontSize="sm">
            Recent Notifications
          </Heading>
          {notifications.map((notification: Notification) => {
            return (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onClick={() => onNotificationClick?.(notification)}
              />
            );
          })}{' '}
        </>
      )}
    </NotificationsContainer>
  );
};
