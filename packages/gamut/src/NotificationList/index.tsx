import React from 'react';
import cx from 'classnames';
import { isEmpty } from 'lodash';
import { omitProps } from '../utils/omitProps';
import { Notification } from './typings';
import { NotificationItem } from './NotificationItem';
import s from './styles/index.module.scss';

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
  const notificationClasses = cx(
    s.notificationsContainer,
    { [s.emptyContainer]: isEmpty(notifications) },
    className
  );

  return (
    <div
      {...omitProps(Object.keys(props), props)}
      className={notificationClasses}
    >
      {isEmpty(notifications) ? (
        <button className={s.emptyText} type="button">
          {'No new notifications.'}
          <br />
          {"You're all caught up!"}
        </button>
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
    </div>
  );
};
