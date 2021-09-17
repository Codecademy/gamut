import { Box, TextButton } from '@codecademy/gamut';
import React, { useState } from 'react';

import { NotificationsContentsProps } from './types';

const defaultDisplayLimit = 3;

export const useNotificationButtons = ({
  actions,
  notifications,
  notificationListRef,
}: NotificationsContentsProps) => {
  const [showMore, setShowMore] = useState(false);
  const [displayLimit, amountAdjective] = showMore
    ? [notifications.length, 'Less']
    : [defaultDisplayLimit, 'More'];

  if (notifications.length === 0) {
    return [null, null, notifications] as const;
  }

  const clearAllButton =
    notifications.length > 0 &&
    (notifications.length <= displayLimit || showMore) ? (
      <TextButton
        onClick={() => {
          actions.clear();
          actions.track('notification_clear_all');
          notificationListRef?.current?.focus();
        }}
        aria-label={`Clear all ${notifications.length} notifications`}
      >
        Clear All
      </TextButton>
    ) : null;

  const showMoreButton =
    notifications.length <= defaultDisplayLimit ? null : (
      <Box px={32}>
        <TextButton
          onClick={() => {
            setShowMore(!showMore);

            if (!showMore) {
              actions.track('notification_show_more');
            }
          }}
        >
          Show {amountAdjective}
        </TextButton>
      </Box>
    );

  return [
    clearAllButton,
    showMoreButton,
    notifications.slice(0, displayLimit),
  ] as const;
};
