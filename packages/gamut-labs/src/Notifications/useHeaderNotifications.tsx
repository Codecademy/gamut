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
  // const [isPaneVisible, setIsPaneVisible] = useState(false);
  const bellRef = useRef<ButtonBaseElements>(null);

  if (!settings) {
    return [null, null];
  }

  const togglePane = () => {
    if (openCrossDeviceItemId !== 'notifications') {
      settings.onEnable();
    }

    const newVal =
      openCrossDeviceItemId === 'notifications' ? '' : 'notifications';

    setOpenCrossDeviceItemId(newVal);
    // setIsPaneVisible((oldIsPaneVisible) => !oldIsPaneVisible);
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
    <AnimatedHeaderZone visible={openCrossDeviceItemId === 'notifications'}>
      <Renderer
        actions={settings.actions}
        bellRef={bellRef}
        notifications={settings.notifications}
        onClose={togglePane}
      />
    </AnimatedHeaderZone>,
  ] as const;
};
