import React from 'react';
import { isEmpty } from 'lodash';
import { omitProps } from '../utils/omitProps';
import { Notification } from './typings';
import { NotificationItem } from './NotificationItem';
import { space } from '@codecademy/gamut-styles';
import { HandlerProps } from '@codecademy/gamut-system';
import styled from '@emotion/styled';

const NotifcationListContainer = styled.div<
  { noContent?: boolean } & HandlerProps<typeof space>
>`
  ${space}
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: ${({ theme }) => theme.fontSize[16]};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors['gray-800']};
`;

const EmptyButton = styled.button`
  background: none;
  border: none;
  text-align: center;
`;

const byDate = (notification1: Notification, notification2: Notification) => {
  return (
    new Date(notification2.date).getTime() -
    new Date(notification1.date).getTime()
  );
};

const sortedNotifications = (notifications: Notification[]) => {
  return notifications.sort(byDate);
};

export type NotificationListProps = {
  className?: string;
  notifications: Notification[];
  onNotificationClick?: (notification: Notification) => void;
};

export const NotificationList = (props: NotificationListProps) => {
  const { className, notifications, onNotificationClick } = props;
  const maxNotifications = 5;

  const visibleNotifications = sortedNotifications(notifications).slice(
    0,
    maxNotifications
  );

  const noContent = isEmpty(notifications);

  return (
    <NotifcationListContainer
      {...omitProps(Object.keys(props), props)}
      className={className}
      padding={noContent ? 48 : 0}
    >
      {noContent ? (
        <EmptyButton type="button">
          {'No new notifications.'}
          <br />
          {"You're all caught up!"}
        </EmptyButton>
      ) : (
        visibleNotifications.map((notification: Notification) => {
          return (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onClick={() => onNotificationClick?.(notification)}
            />
          );
        })
      )}
    </NotifcationListContainer>
  );
};
