import React from 'react';
import cx from 'classnames';
import { isEmpty } from 'lodash';
import omitProps from '../utils/omitProps';
import NotificationItem from './NotificationItem';
import s from './styles/index.scss';
const byDate = (notification1, notification2) => {
  return (
    new Date(notification2.date).getTime() -
    new Date(notification1.date).getTime()
  );
};
const sortedNotifications = notifications => {
  return notifications.sort(byDate);
};
const NotificationList = props => {
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
  return React.createElement(
    'div',
    Object.assign({}, omitProps(Object.keys(props), props), {
      className: notificationClasses,
    }),
    isEmpty(notifications)
      ? React.createElement(
          'div',
          { className: s.emptyText },
          'No new notifications.',
          React.createElement('br', null),
          "You're all caught up!"
        )
      : visibleNotifications.map(notification => {
          return React.createElement(NotificationItem, {
            key: notification.id,
            notification: notification,
            onClick: () =>
              onNotificationClick({
                eventId: notification.id,
                context: notification.campaign,
              }),
          });
        })
  );
};
export default NotificationList;
//# sourceMappingURL=index.js.map
