import React, { useRef, useState } from 'react';

import { ButtonBaseElements } from '../../../../gamut/dist';
import { AnimatedHeaderZone } from '../shared';
import { NotificationBell } from './NotificationBell';
import { NotificationsPane } from './NotificationsPane';
import { AppHeaderNotifications } from './types';

export const useHeaderNotifications = (
  settings: AppHeaderNotifications | undefined
) => {
  const [isPaneVisible, setIsPaneVisible] = useState(false);
  const bellRef = useRef<ButtonBaseElements>(null);

  if (!settings) {
    return [null, null];
  }

  const togglePane = () => {
    if (!isPaneVisible) {
      settings.onEnable();
    }

    setIsPaneVisible((oldIsPaneVisible) => !oldIsPaneVisible);
  };

  return [
    {
      id: 'notifications',
      type: 'render-element',
      renderElement: () => (
        <NotificationBell
          bellRef={bellRef}
          notifications={settings.notifications}
          onClick={togglePane}
        />
      ),
    },
    <AnimatedHeaderZone visible={isPaneVisible}>
      <NotificationsPane
        actions={settings.actions}
        bellRef={bellRef}
        notifications={settings.notifications}
        onClose={togglePane}
      />
    </AnimatedHeaderZone>,
  ] as const;
};
