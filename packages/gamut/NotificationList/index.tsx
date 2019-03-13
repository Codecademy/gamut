import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
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

const NotificationList = (props: NotificationListProps) => {
  const numNotifications = 5;

  const notifications = sortedNotifications(props.notifications).slice(0, numNotifications);
  const notificationClasses = cx(
    s.notificationsContainer,
    { [s.emptyContainer]: isEmpty(notifications) },
  )

  return (
    <div className={notificationClasses}>
      {isEmpty(notifications) ? (
        <div className={s.emptyText}>No new notifications. <br/> You're all caught up!</div>
      ) : (
        notifications.map((notification: Notification) => {
          return <NotificationItem {...notification} date={new Date(notification.date)} />
        })
      )}
    </div>
  );
};

NotificationList.propTypes = propTypes;

export default NotificationList;