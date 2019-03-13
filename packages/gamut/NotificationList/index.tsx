import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { isEmpty } from 'lodash';
import NotificationItem from './Notification';
import s from './styles/index.scss';

const propTypes = {
  className: PropTypes.string,
  notifications: PropTypes.arrayOf(PropTypes.object),
  onNotificationClick: PropTypes.func,
};

interface Notification {
  date: string,
  id: string,
  imageUrl: string,
  link: string,
  text: string,
  unread?: boolean,
};

export type NotificationListProps = {
  className?: string;
  notifications?: Notification[];
  onNotificationClick?: (_: string) => void;
};

const byDate = (notification1: Notification, notification2: Notification) => {
  return new Date(notification2.date).getTime() - new Date(notification1.date).getTime();
}

const sortedNotifications = (notifications: Notification[]) => {
  return notifications.sort(byDate);
}

const NotificationList = (props: NotificationListProps) => {
  const numNotifications = 5;
  const { className, notifications, onNotificationClick } = props;

  const visibleNotifications = sortedNotifications(notifications).slice(0, numNotifications);
  const notificationClasses = cx(
    s.notificationsContainer,
    { [s.emptyContainer]: isEmpty(notifications) },
    className,
  )

  return (
    <div className={notificationClasses}>
      {isEmpty(notifications) ? (
        <div className={s.emptyText}>No new notifications. <br/> You're all caught up!</div>
      ) : (
        visibleNotifications.map((notification: Notification) => {
          return <NotificationItem key={notification.id} {...notification} date={new Date(notification.date)} onClick={() => onNotificationClick(notification.id)} />
        })
      )}
    </div>
  );
};

NotificationList.propTypes = propTypes;

export default NotificationList;