import {
  ButtonBaseElements,
  FlexBox,
  Notification,
  Text,
} from '@codecademy/gamut';
import { BellIcon } from '@codecademy/gamut-icons';
import React, { useEffect } from 'react';

import { HeaderIconButton } from '../AppHeader/shared';

export type NotificationBellProps = {
  bellRef: React.RefObject<ButtonBaseElements>;
  notifications: Notification[];
  onClick: () => void;
};

export const NotificationBell: React.FC<NotificationBellProps> = ({
  bellRef,
  notifications,
  onClick,
}) => {
  const unread = notifications.filter((notification) => notification.unread)
    .length;

  useEffect(() => {
    const favicon = window.document.querySelector<HTMLLinkElement>(
      'link[rel="shortcut icon"]'
    )!;

    if (favicon) {
      favicon.href = `/favicon${unread ? '-unread' : ''}.ico`;
    }
  }, [unread]);

  return (
    <HeaderIconButton
      aria-label={
        unread
          ? `Toggle Notification Menu, ${unread} notifications`
          : 'Toggle Notification Menu'
      }
      icon={BellIcon}
      onClick={onClick}
      ref={bellRef}
    >
      {unread ? (
        <FlexBox
          alignItems="center"
          bg="red-500"
          borderRadius="3px"
          height={18}
          justifyContent="center"
          left={22}
          position="absolute"
          textAlign="center"
          top={-2}
          width={20}
        >
          <Text color="white" fontSize={14} fontWeight="bold" mt={4}>
            {Math.min(unread, 99)}
          </Text>
        </FlexBox>
      ) : null}
    </HeaderIconButton>
  );
};
