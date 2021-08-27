import { Box, TextButton } from '@codecademy/gamut';
import React, { useState } from 'react';

import { NotificationsPaneContentsProps } from './types';

const defaultDisplayLimit = 3;

export const useNotificationButtons = ({
  actions,
  notifications,
}: NotificationsPaneContentsProps) => {
  const [showMore, setShowMore] = useState(false);
  const [displayLimit, amountAdjective] = showMore
    ? [notifications.length, 'Less']
    : [defaultDisplayLimit, 'More'];

  if (notifications.length < displayLimit) {
    return [null, null, notifications] as const;
  }

  const handleShowMoreOrLess = () => {
    setShowMore(!showMore);

    if (!showMore) {
      actions.track('notification_show_more');
    }
  };

  const clearAll = () => {
    actions.clear();
    actions.track('notification_clear_all');
  };

  return [
    <TextButton
      onClick={clearAll}
      aria-label={`Clear all ${notifications.length} notifications`}
    >
      Clear All
    </TextButton>,
    <Box px={32}>
      <TextButton onClick={handleShowMoreOrLess}>
        Show {amountAdjective}
      </TextButton>
    </Box>,
    notifications.slice(0, displayLimit),
  ] as const;
};
