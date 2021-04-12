import cx from 'classnames';
import { isEmpty } from 'lodash';
import React from 'react';

import { omitProps } from '../utils/omitProps';
import { NotificationItem } from './NotificationItem';
import styles from './styles/index.module.scss';
import { Notification } from './typings';

export type NotificationListProps = {
  className?: string;
  notifications: Notification[];
  onNotificationClick?: (notification: Notification) => void;
};

/**
 * @deprecated  This component is deprecated and is no longer supported.
 *
 * See [NotificationsListNew](https://gamut.codecademy.com/storybook/?path=/docs/molecules-notificationlistnew--notification-list-new)
 */

export const NotificationList = (props: NotificationListProps) => {
  const { className, notifications, onNotificationClick } = props;

  const notificationClasses = cx(
    styles.notificationsContainer,
    { [styles.emptyContainer]: isEmpty(notifications) },
    className
  );

  return (
    <div
      {...omitProps(Object.keys(props), props)}
      className={notificationClasses}
    >
      {isEmpty(notifications) ? (
        <button className={styles.emptyText} type="button">
          No new notifications.
          <br />
          You&apos;re all caught up!
        </button>
      ) : (
        notifications.map((notification: Notification) => {
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
