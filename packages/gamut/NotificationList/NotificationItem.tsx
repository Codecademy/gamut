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
  hideBorder: boolean;
};

const formatTime = (notificationDate: string): string => {
  return moment(notificationDate).fromNow();
};

const NotificationItem = (props: NotificationItemProps) => {
  const { notification, onClick, hideBorder } = props;
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

  const TagName = link ? 'a' : 'div';
  const tagProps = link ? { target: '_blank' } : { role: 'presentation' };

  return (
    <TagName
      href={link}
      rel="noopener noreferrer"
      className={cx(notificationClasses, {
        [s.notificationHideBorder]: hideBorder,
      })}
      onClick={onClick}
      {...tagProps}
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
    </TagName>
  );
};

export default NotificationItem;
