import { Notification } from '@codecademy/gamut';
import { debounce, uniqBy } from 'lodash';
import { Dispatch, useMemo } from 'react';
import { useInterval } from 'react-use';

import { fetchAllNotifications } from './notificationRequests';

const interval = 5000;

export const useNotificationsPoll = (
  baseUrl: string,
  notifications: Notification[],
  setNotifications: Dispatch<Notification[]>
) => {
  const fetchNotifications = useMemo(
    () =>
      debounce(async () => {
        const newNotifications = await fetchAllNotifications(
          `${baseUrl}/notifications?target=web`
        );

        setNotifications(uniqBy([...newNotifications, ...notifications], 'id'));
      }, interval),
    [baseUrl, notifications, setNotifications]
  );

  useInterval(
    fetchNotifications,
    typeof document === 'undefined' || document.hidden ? null : interval
  );
};
