import { ButtonBaseElements } from '@codecademy/gamut';
import React, { useRef } from 'react';

import { AnimatedHeaderZone } from '../AppHeader/shared';
import { CrossDeviceStateProps } from '../GlobalHeader/types';
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

  const togglePane = () => {
    if (openCrossDeviceItemId !== 'notifications') {
      settings.onEnable();
    }

    setOpenCrossDeviceItemId((oldVal) =>
      oldVal === 'notifications' ? '' : 'notifications'
    );
  };

  const wrappedTogglePane = () => {
    // eslint-disable-next-line
    console.log('closed from onClose handler');
    togglePane();
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
    <AnimatedHeaderZone
      visible={openCrossDeviceItemId === 'notifications'}
      key="notifications-content"
    >
      <Renderer
        actions={settings.actions}
        bellRef={bellRef}
        notifications={settings.notifications}
        onClose={wrappedTogglePane}
      />
    </AnimatedHeaderZone>,
  ] as const;
};
