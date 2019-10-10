import React from 'react';
import cx from 'classnames';
import { isEmpty } from 'lodash';
import omitProps from '../utils/omitProps';
import { Notification } from './typings';
import NotificationItem from './NotificationItem';
import s from './styles/index.scss';

const byDate = (notification1: Notification, notification2: Notification) => {
  return (
    new Date(notification2.date).getTime() -
    new Date(notification1.date).getTime()
  );
};

const sortedNotifications = (notifications: Notification[]) => {
  return notifications.sort(byDate);
};

type NotificationListProps = {
  className?: string;
  notifications?: Notification[];
  onNotificationClick?: (args: { eventId: string; context: string }) => void;
};

const NotificationList = (props: NotificationListProps) => {
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
        <div className={s.emptyText}>
          {'No new notifications.'}
          <br />
          {"You're all caught up!"}
        </div>
      ) : (
        visibleNotifications.map((notification: Notification) => {
          return (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onClick={() =>
                onNotificationClick({
                  eventId: notification.id,
                  context: notification.campaign,
                })
              }
            />
          );
        })
      )}
    </div>
  );
};

export default NotificationList;
