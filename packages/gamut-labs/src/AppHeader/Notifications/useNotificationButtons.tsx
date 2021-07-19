import { Box, TextButton } from '@codecademy/gamut';
import React, { useState } from 'react';

import { NotificationsPaneContentsProps } from './types';

const defaultDisplayLimit = 3;

// TODO NOTIFICATIONS: moveeee
/* Quick and easy credit: https://stackoverflow.com/a/39835908 */
const pluralizeWithS = (scope: string, scopeCount: number) =>
  `${scope}${scopeCount !== 1 ? 's' : ''}`;

export const useNotificationButtons = ({
  baseUrl,
  setNotifications,
  notifications,
  onTrackingClick,
}: NotificationsPaneContentsProps) => {
  const [showMore, setShowMore] = useState(false);
  const [displayLimit, amountAdjective] = showMore
    ? [notifications.length, 'Less']
    : [defaultDisplayLimit, 'More'];

  if (!notifications.length || notifications.length < displayLimit) {
    return [null, null];
  }

  const handleShowMoreOrLess = () => {
    setShowMore(!showMore);

    if (!showMore) {
      onTrackingClick('notification_show_more');
    }
  };

  const clearAll = () => {
    // TODO NOTIFICATIONS: API call
    fetch(`${baseUrl}/notifications?target=web`, {
      method: 'DELETE',
    });
    setNotifications([]);
    onTrackingClick('notification_clear_all');
  };

  return [
    <TextButton
      onClick={clearAll}
      aria-label={`Clear all ${notifications.length} ${pluralizeWithS(
        'notification',
        notifications.length
      )}`}
    >
      Clear All
    </TextButton>,
    <Box px={32}>
      <TextButton onClick={handleShowMoreOrLess}>
        Show {amountAdjective}
      </TextButton>
    </Box>,
  ] as const;
};
