import React, { useRef, useState } from 'react';

import { ButtonBaseElements } from '../../../../gamut/dist';
import { HookAsComponent } from '../../utils/HookAsComponent';
import { AnimatedHeaderZone } from '../shared';
import { NotificationBell } from './NotificationBell';
import { NotificationsPane } from './NotificationsPane';
import { AppHeaderNotifications } from './types';
import { useNotificationsPoll } from './useNotificationsPoll';

export const useHeaderNotifications = (
  settings: AppHeaderNotifications | undefined
) => {
  const [isPaneVisible, setIsPaneVisible] = useState(false);
  const bellRef = useRef<ButtonBaseElements>(null);
  const [notifications, setNotifications] = useState(settings?.initial ?? []);

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
        <>
          <HookAsComponent
            args={[settings.baseUrl, notifications, setNotifications]}
            hook={useNotificationsPoll}
          />
          <NotificationBell
            bellRef={bellRef}
            notifications={notifications}
            onClick={togglePane}
          />
        </>
      ),
    },
    <AnimatedHeaderZone visible={isPaneVisible}>
      <NotificationsPane
        baseUrl={settings.baseUrl}
        bellRef={bellRef}
        onTrackingClick={settings.onTrackingClick}
        notifications={notifications}
        setNotifications={setNotifications}
        onClose={togglePane}
      />
    </AnimatedHeaderZone>,
  ] as const;
};
