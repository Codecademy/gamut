import { ButtonBaseElements } from '@codecademy/gamut';
import { useRef } from 'react';
import * as React from 'react';

import { AnimatedHeaderZone } from '../AppHeader/shared';
import {
  CrossDeviceItemId,
  CrossDeviceStateProps,
} from '../GlobalHeader/types';
import { NotificationBell } from './NotificationBell';
import {
  AppHeaderNotificationSettings,
  NotificationsRendererProps,
} from './types';

type HeaderNotificationProps = CrossDeviceStateProps & {
  settings: AppHeaderNotificationSettings | undefined;
  Renderer: React.ComponentType<NotificationsRendererProps>;
};

export const useHeaderNotifications = ({
  settings,
  Renderer,
  openCrossDeviceItemId,
  setOpenCrossDeviceItemId,
}: HeaderNotificationProps) => {
  const bellRef = useRef<ButtonBaseElements>(null);

  if (!settings) {
    return [null, null];
  }

  const id = CrossDeviceItemId.NOTIFICATIONS;

  const togglePane = () => {
    if (openCrossDeviceItemId !== id) {
      settings.onEnable();
    }

    setOpenCrossDeviceItemId(
      openCrossDeviceItemId === id ? CrossDeviceItemId.UNSET : id
    );
  };

  return [
    {
      id,
      type: 'render-element',
      renderElement: () => (
        <NotificationBell
          bellRef={bellRef}
          notifications={settings.notifications}
          onClick={togglePane}
        />
      ),
    },
    <AnimatedHeaderZone
      visible={openCrossDeviceItemId === id}
      key="notifications-content"
    >
      <Renderer
        actions={settings.actions}
        bellRef={bellRef}
        notifications={settings.notifications}
        setOpenCrossDeviceItemId={setOpenCrossDeviceItemId}
      />
    </AnimatedHeaderZone>,
  ] as const;
};
