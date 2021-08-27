import { ButtonBaseElements } from '@codecademy/gamut';
import React, { useRef, useState } from 'react';

import { AnimatedHeaderZone } from '../AppHeader/shared';
import { NotificationBell } from './NotificationBell';
import { AppHeaderNotifications, NotificationsRendererProps } from './types';

export const useHeaderNotifications = (
  settings: AppHeaderNotifications | undefined,
  Renderer: React.ComponentType<NotificationsRendererProps>
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
      <Renderer
        actions={settings.actions}
        bellRef={bellRef}
        notifications={settings.notifications}
        onClose={togglePane}
      />
    </AnimatedHeaderZone>,
  ] as const;
};
