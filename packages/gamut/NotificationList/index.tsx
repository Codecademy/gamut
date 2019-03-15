import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { isEmpty } from 'lodash';
import { Notification } from './typings';
import NotificationItem from './NotificationItem';
import s from './styles/index.scss';

const propTypes = {
  className: PropTypes.string,
  notifications: PropTypes.arrayOf(PropTypes.object),
  onNotificationClick: PropTypes.func,
};

const byDate = (notification1: Notification, notification2: Notification) => {
  return new Date(notification2.date).getTime() - new Date(notification1.date).getTime();
}

const sortedNotifications = (notifications: Notification[]) => {
  return notifications.sort(byDate);
}

const MAX_NOTIFICATIONS = 5; 

type NotificationListProps = {
  className?: string;
  notifications?: Notification[];
  onNotificationClick?: (_: string) => void;
};

const NotificationList = (props: NotificationListProps) => {
  const { className, notifications, onNotificationClick } = props;

  const visibleNotifications = sortedNotifications(notifications).slice(0, MAX_NOTIFICATIONS);
  const notificationClasses = cx(
    s.notificationsContainer,
    { [s.emptyContainer]: isEmpty(notifications) },
    className,
  )

  return (
    <div className={notificationClasses}>
      {isEmpty(notifications) ? (
        <div className={s.emptyText}>No new notifications.<br/>You're all caught up!</div>
      ) : (
        visibleNotifications.map((notification: Notification) => {
          return <NotificationItem key={notification.id} {...notification} onClick={() => onNotificationClick(notification.id)} />
        })
      )}
    </div>
  );
};

NotificationList.propTypes = propTypes;

export default NotificationList;