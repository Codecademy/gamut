import React from 'react';
import cx from 'classnames';
import moment from 'moment';
import Truncate from 'react-truncate';
import { Notification } from './typings';
import NotificationIcon from './NotificationIcon';
import s from './styles/Notification.scss';

export type NotificationItemProps = {
  onClick?: (event: object) => void;
  notification: Notification;
};

const formatTime = (notificationDate: string): string => {
  return moment(notificationDate).fromNow();
};

const NotificationItem = (props: NotificationItemProps) => {
  const { notification, onClick } = props;
  const {
    date,
    iconSettings,
    iconSlug,
    imageUrl,
    link,
    text,
    unread,
  } = notification;

  const notificationClasses = cx(s.notification, {
    [s.unread]: unread,
  });

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={notificationClasses}
      onClick={onClick}
    >
      <NotificationIcon
        iconSettings={iconSettings}
        iconSlug={iconSlug}
        imageUrl={imageUrl}
      />
      <div className={s.body}>
        <div className={s.text}>
          <Truncate lines={3} ellipsis="...">
            {text}
          </Truncate>
        </div>
        <div className={s.time}>{formatTime(date)}</div>
      </div>
    </a>
  );
};

export default NotificationItem;
