import React from 'react';
import cx from 'classnames';
import moment from 'moment';
import Truncate from '../Truncate';
import { Notification } from './typings';
import NotificationIcon from './NotificationIcon';
import s from './styles/Notification.module.scss';

export type NotificationItemProps = {
  onClick?: (event: object) => void;
  notification: Notification;
};

const formatTime = (notificationDate: string): string => {
  return moment(notificationDate).fromNow();
};

export const NotificationItem: React.FC<NotificationItemProps> = (props) => {
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

  const [TagName, tagProps] = link
    ? ([
        'a',
        { href: link, rel: 'noopener noreferrer', target: '_blank' },
      ] as const)
    : (['button', { type: 'button' }] as const);

  return (
    <TagName
      className={cx(notificationClasses)}
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
          <Truncate lines={3}>{text}</Truncate>
        </div>
        <div className={s.time}>{formatTime(date)}</div>
      </div>
    </TagName>
  );
};

export default NotificationItem;
