import { Notification } from '@codecademy/gamut';
import { useCallback } from 'react';
import { useMap } from 'react-use';

import { NotificationActions } from './types';

export const useNotificationsMap = (
  initial: Notification[]
): [Notification[], NotificationActions] => {
  const [notifications, actions] = useMap(
    new Map(initial.map((notification) => [notification.id, notification]))
  );

  // TODO move this
  const markRead = useCallback(
    (readNotifications: Notification[]) => {
      actions.setAll(
        new Map(
          readNotifications.map((notification) => [
            notification.id,
            {
              ...notification,
              unread: false,
            },
          ])
        )
      );
    },
    [actions]
  );

  return [
    Array.from(notifications.values()),
    {
      ...actions,
      markRead,
    } as NotificationActions,
  ];
};
