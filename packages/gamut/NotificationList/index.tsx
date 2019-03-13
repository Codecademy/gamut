import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import NotificationItem from './Notification';
import s from './styles/index.scss';

const propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.object),
};

interface Notification {
  text: string,
  unread?: boolean,
  imageUrl: string,
  date: string,
  link: string,
};

export type NotificationListProps = {
  notifications?: Notification[];
};

const byDate = (notification1: Notification, notification2: Notification) => {
  return new Date(notification2.date).getTime() - new Date(notification1.date).getTime();
}

const sortedNotifications = (notifications: Notification[]) => {
  return notifications.sort(byDate);
}

const numNotifications = 5;

const NotificationList = (props: NotificationListProps) => {
  const notifications = sortedNotifications(props.notifications).slice(0, numNotifications);

  if(isEmpty(notifications)) {
    return(<p>No notifications!</p>);
  }

  return (
    <div className={s.notificationsContainer}>
      {notifications.map((notification: Notification) => {
        return <NotificationItem {...notification} date={new Date(notification.date)} />
      })}
    </div>
  );
};

NotificationList.propTypes = propTypes;

export default NotificationList;